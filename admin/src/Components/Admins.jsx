import { useState } from "react"
import apiRequest from "../Libs/apiRequest"
import { ADMINS_URL } from "../Utils/Constants"


function Admins(){
    const [id, setId] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [date, setDate] = useState("")
    const [role, setRole] = useState("")

    const [admins, setAdmins] = useState([])

    const handleSearch = async () => {
        const data = {
            id: id || null,
            username: username || null,
            email: email || null,
            date: date || null,
            role: role || null,
        }

        try{
            const res = await apiRequest.get(ADMINS_URL, {params: data, withCredentials: true})
            if(res.status === 200 && res.data){
                setAdmins(res.data)
            }
            console.log(res.data)
        }catch(e){
            console.log(e)
        }
    }

    const handleLandClick = (e) => {
        console.log(e.currentTarget.id)
        /*navigate()*/
    }




    return (
        <div className="flex flex-col bg-[hsl(216,30%,68%)]">
            <h1 className="flex justify-center items-center text-[2em] mt-[30px]">ADMINS</h1>
            
            <div className="h-[50px] flex justify-center items-center gap-[20px] bg-[hsl(216,30%,68%)] py-[0px] mt-[20px]">

            <select className="w-[20%] h-[100%] outline-none rounded-[5px] p-[10px]" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select role</option>
                    <option value="admin">admin</option>
                    <option value="superAdmin">superAdmin</option>
                </select>

                <input type="text" className="w-[20%] h-[100%] outline-none rounded-[5px] p-[10px]" placeholder="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}/>

                <input type="text" className="w-[20%] h-[100%] outline-none rounded-[5px] p-[10px]" placeholder="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>


                <button className="w-[13%] h-[100%] border border-black rounded-[5px] bg-[hsl(256,26%,30%)] text-white hover:bg-[hsl(256,26%,20%)]"
                onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div className="mt-[50px]">
                <div className="flex justify-center items-center bg-[hsl(256,26%,30%)] py-[10px] text-white">
                    <div className="w-[10%] flex justify-center items-center">
                        COUNT
                    </div>
                    <div className="w-[30%] flex justify-center items-center">
                        USERNAME
                    </div>
                    <div className="w-[30%] flex justify-center items-center">
                        EMAIL
                    </div>
                    <div className="w-[15%] flex justify-center items-center">
                        DATE
                    </div>
                    <div className="w-[10%] flex justify-center items-center">
                        ROLE
                    </div>
                </div>
                 {/*Users*/}
                <div className="flex flex-col bg-[hsl(216,30%,68%)]">
                    {
                        admins && admins.map((admin, idx) => (
                            <div className="flex cursor-pointer py-[10px] hover:bg-[hsl(216,30%,48%)]" 
                            key={idx}
                            id={admin.id}
                            onClick={handleLandClick}>
                                <div className="w-[10%] flex justify-center items-center">
                                    {idx}
                                </div>
                                <div className="w-[35%] flex justify-center items-center">
                                    {admin.username}
                                </div>
                                <div className="w-[35%] flex justify-center items-center">
                                    {admin.email}
                                </div>
                                <div className="w-[20%] flex justify-center items-center">
                                    {(admin.createdAt).slice(0, 10)}
                                </div>
                    </div>
                        ))
                    }
                </div>
               
            </div>
        </div>
    )
}


export default Admins