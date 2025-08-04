import { useUserStore } from "../Utils/Store.jsx"
import AdminInfo from "./AdminInfo.jsx"


function Sidebar(){
    const {userInfo, setSelectedOption} = useUserStore()
    console.log(userInfo)

    return (
        <div className="bg-[hsl(256,26%,20%)] h-[100vh] w-[20vw] text-white flex flex-col gap-[10px]">
            <div className="cursor-pointer"><AdminInfo /></div>
            <div className="cursor-pointer bg-[hsl(256,26%,30%)] h-[50px] flex justify-center items-center hover:bg-[hsl(256,26%,25%)]"
            onClick={() => setSelectedOption("dashboard")}>
                Dashboard
            </div>
            <div className="cursor-pointer bg-[hsl(256,26%,30%)] h-[50px] flex justify-center items-center hover:bg-[hsl(256,26%,25%)]"
            onClick={() => setSelectedOption("lands")}>
                Lands
            </div>
            <div className="cursor-pointer bg-[hsl(256,26%,30%)] h-[50px] flex justify-center items-center hover:bg-[hsl(256,26%,25%)]"
            onClick={() => setSelectedOption("users")}>
                Users
            </div>
            {
                userInfo.role === "superAdmin" 
                    &&
                    <div className="cursor-pointer bg-[hsl(256,26%,30%)] h-[50px] flex justify-center items-center hover:bg-[hsl(256,26%,25%)]"
                    onClick={() => setSelectedOption("admins")}>
                        Admins
                    </div>
            }
            <div className="cursor-pointer bg-[hsl(256,26%,30%)] h-[50px] flex justify-center items-center hover:bg-[hsl(256,26%,25%)]"
            onClick={() => setSelectedOption("profile")}>
                Profile
            </div>
            {
                userInfo.role === "superAdmin" 
                    &&
                <div className="cursor-pointer bg-[hsl(256,26%,30%)] h-[50px] flex justify-center items-center hover:bg-[hsl(256,26%,25%)]"
                onClick={() => setSelectedOption("create")}>
                    Create Admin Account
                </div> 
            }
            <div className="cursor-pointer bg-[hsl(256,26%,30%)] h-[50px] flex justify-center items-center hover:bg-[hsl(256,26%,25%)]"
            onClick={() => setSelectedOption("settings")}>
                Settings
            </div>

            <div className="hidden"
            onClick={() => setSelectedOption("client")}>
            </div>

            <div className="hidden"
            onClick={() => setSelectedOption("land")}>
            </div>

        </div>
    )
}


export default Sidebar