import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";


function ProfilePage() {
  const navigate = useNavigate()
  const {updateUser, currentUser} = useContext(AuthContext)
  const data = useLoaderData()


  const handleLogout = async ()=>{
      try{
          await apiRequest.post("/auth/logout")
          updateUser(null)
          navigate("/")
      }catch(e){
        console.log(e)
      }
  }



  return (
    
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "noavatar.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>} errorElement={<p>Failed to load posts!</p>}>
          <Await resolve={data.postResponse}>
            {
              (postResponse) => <List posts={postResponse.data.userPosts}/>
            }
          </Await>
        </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>} errorElement={<p>Failed to load posts!</p>}>
          <Await resolve={data.postResponse}>
            {
              (postResponse) => <List posts={postResponse.data.savedPosts}/>
            }
          </Await>
        </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>} errorElement={<p>Failed to load chats!</p>}>
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
