import { useState } from "react"
import apiRequest from "../Libs/apiRequest"
import { USERS_URL } from "../Utils/Constants"
import { useUserStore } from "../Utils/Store"


function Users(){
    const [id, setId] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [date, setDate] = useState("")

    const [users, setUsers] = useState([])
    const {setClient, setSelectedOption, selectedOption, client} = useUserStore()

    const handleSearch = async () => {
        const data = {
            id: id || null,
            username: username || null,
            email: email || null,
            date: date || null,
        }

        try{
            const res = await apiRequest.get(USERS_URL, {params: data, withCredentials:true})
            if(res.status === 200 && res.data){
                setUsers(res.data)
            }
            console.log(res.data)
        }catch(e){
            console.log(e)
        }
    }

    const handleLandClick = (e) => {
        const id = e.currentTarget.id
        console.log(id)
        setSelectedOption("client")
        setClient(id)
        /*navigate()*/
    }




    return (
        <div className="flex flex-col bg-[hsl(216,30%,68%)]">
            <h1 className="flex justify-center items-center text-[2em] mt-[30px]">USERS</h1>
            
            <div className="h-[50px] flex justify-center items-center gap-[20px] bg-[hsl(216,30%,68%)] py-[0px] mt-[20px]">
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
                <div className="flex bg-[hsl(256,26%,30%)] py-[10px] text-white">
                    <div className="w-[10%] flex justify-center items-center">
                        COUNT
                    </div>
                    <div className="w-[35%] flex justify-center items-center">
                        USERNAME
                    </div>
                    <div className="w-[35%] flex justify-center items-center">
                        EMAIL
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                        DATE
                    </div>
                </div>
                 {/*Users*/}
                <div className="flex flex-col bg-[hsl(216,30%,68%)]">
                    {
                        users && users.map((user, idx) => (
                            <div className="flex cursor-pointer py-[10px] hover:bg-[hsl(216,30%,48%)]" 
                            key={idx}
                            id={user.id}
                            onClick={handleLandClick}>
                                <div className="w-[10%] flex justify-center items-center">
                                    {idx}
                                </div>
                                <div className="w-[35%] flex justify-center items-center">
                                    {user.username}
                                </div>
                                <div className="w-[35%] flex justify-center items-center">
                                    {user.email}
                                </div>
                                <div className="w-[20%] flex justify-center items-center">
                                    {(user.createdAt).slice(0, 10)}
                                </div>
                    </div>
                        ))
                    }
                </div>
               
            </div>
        </div>
    )
}


export default Users