import { useNavigate } from "react-router-dom";
import Admins from "../Components/Admins";
import Lands from "../Components/Lands";
import Sidebar from "../Components/Sidebar";
import Users from "../Components/Users";
import { useUserStore } from "../Utils/Store";
import Login from "./Login";
import { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import CreateAdmin from "../Components/CreateAdmin";
import Profile from "../Components/Profile";
import UserProfile from "../Components/UserProfile";
import Land from "../Components/Land";


function Home(){
    const {userInfo, setUserInfo} = useUserStore()
    const {selectedOption} = useUserStore()
    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo){
            navigate("/login")
        }
    }, [userInfo, setUserInfo])
    
    return(
        <div className="flex h-[100vh] bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
                {
                    selectedOption === "dashboard" && <Dashboard />
                }
                {
                    selectedOption === "lands" && <Lands />
                }
                {
                    selectedOption === "users" && <Users />
                }
                {
                    selectedOption === "admins" && <Admins />
                }
                {
                    selectedOption === "profile" && <Profile />
                }
                {
                    selectedOption === "create" && <CreateAdmin />
                }
                {
                    selectedOption === "settings" && <div className="p-8"><div className="bg-white rounded-lg shadow-lg p-6"><h2 className="text-2xl font-bold text-gray-900">Settings</h2><p className="text-gray-600 mt-2">Settings page coming soon...</p></div></div>
                }
                {
                    selectedOption === "client" && <UserProfile />
                }
                {
                    selectedOption == "land" && <Land />
                }
            </div>
        </div>
    )
}

export default Home