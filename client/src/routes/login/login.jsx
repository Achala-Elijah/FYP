import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import { AuthContext } from "../../context/AuthContext.jsx";

function Login() {


  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState("")
  const navigate = useNavigate()
  const {updateUser} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErr("")
    const formData = new FormData(e.target)

    const username = formData.get("username")
    const password = formData.get("password")

    console.log(username, password)
    try{
        const res = await apiRequest.post("/auth/login", {
          username,
          password
        })
        
        updateUser(res.data)
        navigate("/")
    }catch(e){
      console.log(e)
      setErr(e.response.data.message)
    }finally{
      setIsLoading(false)
    }
    
  }


  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {err && <span>{err}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
