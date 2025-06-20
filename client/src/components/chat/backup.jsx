import { useContext, useEffect, useRef, useState, useCallback } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext.jsx";
import { useNotificationStore } from "../../lib/notificationStore.js";

function Chat({ chats, setChats }) {
  const [chat, setChat] = useState(null);
  // Using a ref to access the *latest* chat state in event listeners without re-creating listeners
  const chatRef = useRef(chat);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();

  const decreaseNotification = useNotificationStore((state) => state.decrease);
  const increaseNotification = useNotificationStore((state) => state.increase); // Assuming you have this in your store

  // Update the ref whenever the chat state changes
  useEffect(() => {
    chatRef.current = chat;
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Read message handler, memoized with useCallback
  const readChatMessages = useCallback(async (chatId) => {
    try {
      if (chatId) {
        await apiRequest.put("/chats/read/" + chatId);
      }
    } catch (e) {
      console.log("Read error:", e);
    }
  }, []); // No dependencies, as it only takes chatId as argument

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;

    try {
      // Send message to backend
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      const newMessage = res.data;

      // Update current chat state immediately
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
      e.target.reset(); // Clear the textarea

      // Emit message to other users via socket
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: newMessage, // Send the full message object
      });

      // Update the 'chats' list for the sender's side
      setChats((prevChats) =>
        prevChats.map((c) =>
          c.id === chat.id
            ? {
                ...c,
                lastMessage: text,
                // Ensure seenBy includes current user, and set notified to false
                seenBy: [...new Set([...c.seenBy, currentUser.id])],
                notified: false,
              }
            : c
        )
      );
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      const chatData = res.data;

      // Find the chat in the current `chats` list passed as prop
      const chatInList = chats.find((c) => c.id === id);

      // Check if chat needs to be marked as seen or notification decreased
      if (!chatData.seenBy.includes(currentUser?.id) || chatInList?.notified) {
        // Update the global chats list for seenBy and notified status
        setChats((prevChats) =>
          prevChats.map((c) =>
            c.id === id
              ? {
                  ...c,
                  seenBy: [...new Set([...c.seenBy, currentUser.id])], // Add current user to seenBy
                  notified: false, // Mark as not notified when opened
                }
              : c
          )
        );

        // Decrease global notification count only if it was previously notified
        if (chatInList?.notified) {
          decreaseNotification();
        }
      }

      setChat({ ...chatData, receiver }); // Set the currently active chat
    } catch (e) {
      console.log("Error opening chat:", e);
    }
  };

  // Main useEffect for Socket.IO event listeners
  useEffect(() => {
    if (!socket) return; // Ensure socket is available

    const handleIncomingMessage = (data) => {
      console.log("Received message via socket:", data);

      // --- Update the 'chats' list (left panel) ---
      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c.id !== data.chatId) {
            // If it's not the specific chat being updated, return it as is
            return c;
          }

          // This is the chat that received a new message
          const currentChatIsOpen = chatRef.current?.id === data.chatId;

          let updatedChat = {
            ...c,
            lastMessage: data.text,
          };

          if (currentChatIsOpen) {
            // If the chat is currently open, mark it as seen by current user and not notified
            updatedChat.seenBy = [...new Set([...c.seenBy, currentUser.id])];
            updatedChat.notified = false;
            // No need to decrease notification here, as it's being opened and read
            // The notification decrease happens when opening the chat via handleOpenChat
          } else {
            // If the chat is NOT currently open
            // Mark as not seen by current user (for background color)
            updatedChat.seenBy = c.seenBy.filter((id) => id !== currentUser.id);
            // Mark as notified if it wasn't already, and increase global count
            if (!c.notified) {
              increaseNotification(); // Increase global notification count
              updatedChat.notified = true;
            }
          }
          return updatedChat;
        })
      );

      // --- Update the currently open 'chat' (right panel) if it matches ---
      if (chatRef.current?.id === data.chatId) {
        setChat((prev) => ({
          ...prev,
          // Ensure prev.messages is an array before spreading
          messages: [...(Array.isArray(prev?.messages) ? prev.messages : []), data],
        }));
        readChatMessages(data.chatId); // Mark the current open chat messages as read
      }
    };

    socket.on("getMessage", handleIncomingMessage);

    // Cleanup function to remove the event listener when the component unmounts or dependencies change
    return () => {
      socket.off("getMessage", handleIncomingMessage);
    };
  }, [socket, currentUser, setChats, increaseNotification, readChatMessages]);
  // `chatRef` is not a dependency as we access its `.current` value which doesn't trigger re-renders.
  // `decreaseNotification` is not needed here as it's handled in `handleOpenChat`.

  // Removed `setRender` as it's an anti-pattern and not necessary with correct state updates.
  // The `chat` and `chats` state updates will trigger re-renders naturally.

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c?.id}
            style={{
              // Background color logic: if current user hasn't seen it, OR if it's explicitly notified, show highlight
              backgroundColor:
                !c.seenBy.includes(currentUser?.id) || c.notified ? "#fecd514e" : "white",
            }}
            onClick={() => handleOpenChat(c?.id, c?.receiver)}
          >
            <img src={c?.receiver?.avatar || "/noavatar.png"} alt="" />
            <span>{c?.receiver?.username}</span>
            <p>{c?.lastMessage}</p>
          </div>
        ))}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat?.receiver?.avatar || "noavatar.png"} alt="" />
              {chat?.receiver?.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>

          <div className="center">
            {chat?.messages?.map((message) => (
              <div
                className="chatMessage"
                key={message?.id}
                style={{
                  alignSelf:
                    message?.userId === currentUser?.id ? "flex-end" : "flex-start",
                  textAlign:
                    message?.userId === currentUser?.id ? "right" : "left",
                }}
              >
                <p>{message?.text}</p>
                <span>{format(message?.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>

          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;