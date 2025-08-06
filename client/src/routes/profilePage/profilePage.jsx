import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function ProfilePage() {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const data = useLoaderData();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <section className="card">
            <div className="card-header">
              <h2>User Information</h2>
              <Link to="/profile/update">
                <button className="primary">Update Profile</button>
              </Link>
            </div>
            <div className="info">
              <div className="info-item">
                <strong>Avatar:</strong>
                <img src={currentUser.avatar || "/noavatar.png"} alt="User Avatar" />
              </div>
              <div className="info-item">
                <strong>Username:</strong> {currentUser.username}
              </div>
              <div className="info-item">
                <strong>Email:</strong> {currentUser.email}
              </div>
              <button className="danger" onClick={handleLogout}>Logout</button>
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <h2>My Posts</h2>
              <Link to="/add">
                <button className="primary">Create New Post</button>
              </Link>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <Await resolve={data.postResponse}>
                {(postResponse) => <List posts={postResponse.data.userPosts} />}
              </Await>
            </Suspense>
          </section>

          <section className="card">
            <div className="card-header">
              <h2>Saved List</h2>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <Await resolve={data.postResponse}>
                {(postResponse) => <List posts={postResponse.data.savedPosts} />}
              </Await>
            </Suspense>
          </section>
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.chatResponse}>
              {(chatResponse) => {
                const [chats, setChats] = useState(chatResponse.data);
                return <Chat chats={chats} setChats={setChats} />;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
