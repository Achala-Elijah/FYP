import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {AuthContext} from "../../context/AuthContext.jsx"
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const {currentUser} = useContext(AuthContext)
  const post = useLoaderData()
  const [saved, setSaved] = useState(post.isSaved)
  const navigate = useNavigate()


  const handleSave = async () => {
    setSaved(p => !p)
    if(!currentUser){
      navigate("/login")
    }
    try{
      await apiRequest.post("/users/save", {postId: post.id})
    }catch(e){
      console.log(e)
      setSaved(p => !p)
    }
  }


  const handleMessage = async () => {
    try{
      const receiverId = post.userId
      console.log("receiverId: ", receiverId)
      await apiRequest.post("/chats", {receiverId})
      //await apiRequest.post("/messages/"
      navigate("/profile")

    }catch(err){
      console.log(err)
      if(err.response.data == "Chat already exist!!") navigate("/profile")
    }
    
  }


  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom">{post.postDetail.desc}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">


          <div className="price" style={{display: "flex", alignItems: "center"}}>$ {post.price}</div>

            <div className="address" style={{display: "flex", alignItems: "center"}}>
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>

          <div className="size" style={{display: "flex", alignItems: "center", gap:"5px"}}>
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>

            
            {/*<div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {
                  post.postDetail.utilities === "owner" ?
                  <p>Owner is responsible</p> : <p>Tenant is responsible</p>

                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {
                  post.postDetail.utilities === "allowed" ? 
                  <p>Pets Allowed</p> : <p>Pets not Allowed</p>
                }
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
              </div>*/}
          </div>
          {/*<p className="title">Size</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} bed(s)</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom(s)</span>
              </div>
          </div>*/}
          {/*<p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant} away</p>
              </div>
            </div>
            </div>*/}
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleMessage}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave} style={{
              backgroundColor: saved ? "#fece51" : "white"
            }}>
              <img src="/save.png" alt="" />
              {saved ? "Place saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
