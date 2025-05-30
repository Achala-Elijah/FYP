import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest"

function ProfileUpdatePage() {
  const [err, setErr] = useState("")
  const {updateUser, currentUser} = useContext(AuthContext)
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const [file, setFile] = useState(null)
  const navigate = useNavigate()


  const handleAvatar = async (e) => {
    const file = e.target.files[0]
    setFile(file)
    
    if(file){
      setAvatar(URL.createObjectURL(file)) 
    }else{
      setAvatar(currentUser.avatar)
      URL.revokeObjectURL(avatar)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formAvatar = new FormData()
    formAvatar.set("avatar", file)
    const {username, email, password} = Object.fromEntries(formData)

    try{
      const avatarRes = await apiRequest.post(`/uploads/avatar`, formAvatar)
      const avatarUrl = avatarRes.data

      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatarUrl
      })

      updateUser(res.data)
      navigate("/profile")

    }catch(e){
      console.log(e)
      setErr(e.response.data.message)
    }
  }


  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {err && <span>{err}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar || "/noavatar.png"} alt="" className="avatar" />
        <input type="file" name="avatar" onChange={handleAvatar}/>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
