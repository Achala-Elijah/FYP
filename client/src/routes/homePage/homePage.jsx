import { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import Card from "../../components/card/Card"

function HomePage() {

  const {currentUser} = useContext(AuthContext)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const posts = await apiRequest.get("/posts")
      setPosts(posts.data)
    }
  
    getPosts()
  }, [])

  
  
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Welcome to LandLink Ghana</h1>
          <p>
              Your trusted digital hub for discovering, listing and managing land in Ghana.
          </p>
          <SearchBar />
          {/*<div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
  </div>*/}
          <div className='list'>
            {posts.map(item=>(
                <Card key={item.id} item={item}/>
              ))}
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
