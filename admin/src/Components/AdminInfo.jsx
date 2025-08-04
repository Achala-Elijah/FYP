import { useUserStore } from "../Utils/Store"
import adminAvatar from "../assets/adminAvatar.jpeg"


function AdminInfo(){
    const {userInfo} = useUserStore()
    return (
        <div className="bg-[hsl(256,26%,20%)] text-white flex flex-col justify-center items-center gap-[10px] p-[10px]">
            <div className="w-[70px] h-[70px] bg-[hsl(216,30%,68%)] flex justify-center items-center"><img src={adminAvatar}/></div>
            <div className="flex flex-col flex-1 justify-around items-center">
                <div className="">{userInfo.username}</div>
                <div className="">{userInfo.email}</div>
            </div>
        </div>
    )
}


export default AdminInfo