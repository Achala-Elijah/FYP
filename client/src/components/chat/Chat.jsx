import { useContext, useEffect, useRef, useState, useCallback } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext.jsx";
import { useNotificationStore } from "../../lib/notificationStore.js";

function Chat({ chats, setChats }) {
  const [chat, setChat] = useState(null);
  const chatRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();

  const decreaseNotification = useNotificationStore((state) => state.decrease);
  const increaseNotification = useNotificationStore((state) => state.increase);

  // Update chatRef when chat changes
  useEffect(() => {
    chatRef.current = chat;
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const readChatMessages = useCallback(async (chatId) => {
    try {
      if (chatId) {
        await apiRequest.put("/chats/read/" + chatId);
      }
    } catch (e) {
      console.log("Read error:", e);
      // Don't throw the error, just log it since this is not critical
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text?.trim()) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text: text.trim() });
      const newMessage = res.data;

      setChat((prev) => ({
        ...prev,
        messages: [...(prev?.messages || []), newMessage],
      }));
      e.target.reset();

      // Emit socket message
      if (socket) {
        socket.emit("sendMessage", {
          receiverId: chat.receiver.id,
          data: newMessage,
        });
      }

      // Update chats list
      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id
            ? {
                ...c,
                lastMessage: text.trim(),
                seenBy: [...new Set([...(c.seenBy || []), currentUser.id])],
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
      const initialChatState = chats.find((c) => c.id === id);
      const res = await apiRequest("/chats/" + id);
      const chatData = res.data;

      const wasUnreadByCurrentUser = 
        !initialChatState?.seenBy?.includes(currentUser?.id) || 
        initialChatState?.notified;

      // Update the chat as read in the list
      setChats((prevChats) =>
        prevChats.map((c) =>
          c.id === id
            ? {
                ...c,
                seenBy: [...new Set([...(c.seenBy || []), currentUser.id])],
                notified: false,
              }
            : c
        )
      );

      // Decrease notification count if it was unread
      if (wasUnreadByCurrentUser) {
        decreaseNotification();
      }

      // Set the active chat
      setChat({ ...chatData, receiver });
      
      // Mark messages as read (non-blocking)
      readChatMessages(id).catch(err => {
        console.log("Non-critical: Could not mark messages as read:", err);
      });
    } catch (e) {
      console.log("Error opening chat:", e);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data) => {
      // Update chats list
      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c.id !== data.chatId) {
            return c;
          }

          const currentChatIsOpen = chatRef.current?.id === data.chatId;

          let updatedChat = {
            ...c,
            lastMessage: data.text,
          };

          if (currentChatIsOpen) {
            // If chat is open, mark as seen
            updatedChat.seenBy = [...new Set([...(c.seenBy || []), currentUser.id])];
            updatedChat.notified = false;
          } else {
            // If chat is not open, remove from seenBy and increase notification
            updatedChat.seenBy = (c.seenBy || []).filter((id) => id !== currentUser.id);
            if (!c.notified) {
              increaseNotification();
              updatedChat.notified = true;
            }
          }
          return updatedChat;
        })
      );

      // If the message is for the currently open chat, add it to messages
      if (chatRef.current?.id === data.chatId) {
        setChat((prev) => ({
          ...prev,
          messages: [...(prev?.messages || []), data],
        }));
        // Mark as read since chat is open (non-blocking)
        readChatMessages(data.chatId).catch(err => {
          console.log("Non-critical: Could not mark messages as read:", err);
        });
      }
    };

    socket.on("getMessage", handleIncomingMessage);

    return () => {
      socket.off("getMessage", handleIncomingMessage);
    };
  }, [socket, currentUser, setChats, increaseNotification, readChatMessages]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                !c.seenBy?.includes(currentUser?.id) || c.notified
                  ? "#fecd514e"
                  : "white",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img 
              src={c.receiver?.avatar || "/noavatar.png"} 
              alt={c.receiver?.username || "User"} 
            />
            <span>{c.receiver?.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img 
                src={chat.receiver?.avatar || "/noavatar.png"} 
                alt={chat.receiver?.username || "User"} 
              />
              {chat.receiver?.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>

          <div className="center">
            {chat.messages?.map((message) => (
              <div
                className="chatMessage"
                key={message.id}
                style={{
                  alignSelf: message.userId === currentUser?.id ? "flex-end" : "flex-start",
                  textAlign: message.userId === currentUser?.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>

          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" placeholder="Type a message..." required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;