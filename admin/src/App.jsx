import { useEffect, useState } from "react"
import Home from "./Pages/Home"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useUserStore } from "./Utils/Store"
import apiRequest from "./Libs/apiRequest"
import { GET_ADMIN_INFO_URL } from "./Utils/Constants"
import Login from "./Pages/Login"


const ProtectedRoute = ({children}) => {
  const {userInfo} = useUserStore()
  const isAuthenticated = !!userInfo
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  const [loading, setLoading] = useState(true)
  const {userInfo, setUserInfo} = useUserStore()

  useEffect(() => {
    const getUserData = async () => {
      try{
        const res = await apiRequest.get(GET_ADMIN_INFO_URL, {withCredentials: true})
        console.log(res.data)
        if(res.status === 200 && res.data){
          setUserInfo(res.data)
        }
      }catch(e){
        console.log(e)
      }
      finally{
        setLoading(false)
      }
    }

    if(!userInfo){
      getUserData()
    }
  }, [userInfo, setUserInfo])

  if(loading){
    return (<div>Loading...</div>)
  }

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            }/>

          <Route path="/login" element={<Login />}/>

	        <Route path="/settings" element={
            <ProtectedRoute>
              <div>Settings</div>
            </ProtectedRoute>
          }/>

	        <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
  
}

export default App
