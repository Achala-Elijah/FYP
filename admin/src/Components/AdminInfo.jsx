import { useUserStore } from "../Utils/Store"
import adminAvatar from "../assets/adminAvatar.jpeg"


function AdminInfo(){
    const {userInfo} = useUserStore()
    return (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white flex flex-col justify-center items-center gap-4 p-6">
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 shadow-lg">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img 
                            src={adminAvatar} 
                            alt="Admin Avatar" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800"></div>
            </div>
            <div className="flex flex-col items-center space-y-1">
                <div className="font-semibold text-lg text-white">{userInfo.username}</div>
                <div className="text-sm text-slate-300 truncate max-w-full">{userInfo.email}</div>
                <div className="text-xs bg-blue-600 px-2 py-1 rounded-full text-white font-medium">
                    {userInfo.role === "superAdmin" ? "Super Admin" : "Admin"}
                </div>
            </div>
        </div>
    )
}


export default AdminInfo