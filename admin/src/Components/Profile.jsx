import { useEffect, useState } from "react"
import apiRequest from "../Libs/apiRequest"
import { UPDATE_ADMIN_URL } from "../Utils/Constants"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../Utils/Store"

function Profile(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const {userInfo} = useUserStore()

    useEffect(() => {
        if(userInfo){
            setUsername(userInfo.username)
            setRole(userInfo.role)
            setEmail(userInfo.email)
        }
    })

    const handleUpdate = async () => {
        try{
            if(handleConfirmPassword()){
                return
            }

            console.log("in")
            const res = await apiRequest.post(UPDATE_ADMIN_URL, {username, email, password, role}, {withCredentials: true})

            if(res.status === 200){
                handleSuccess()
            }
        }catch(e){
            console.log(e)
        }
    }

    const handleConfirmPassword = () => {
        if(confirmPassword != password){
            setError(true)
            return true
        }
        return false
    }

    const handleSuccess = () => {
        setError(false)
        setSuccess(true)
    }


    return(
        <div className="flex justify-center items-center h-[100vh]">
            <div className="flex flex-col justify-center items-center gap-7 bg-[hsl(216,30%,68%)] p-[50px] rounded-md">
            <h1 className="font-bold text-3xl">UPDATE ACCOUNT</h1>

            <input type="text" className="border border-black outline-none p-[5px] rounded-sm w-[30vw]"
                placeholder="Username"
                disabled
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>

                <input type="email" className="border border-black outline-none p-[5px] rounded-sm w-[30vw]"
                placeholder="Email"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <input type="text" className="border border-black outline-none p-[5px] rounded-sm w-[30vw]"
                disabled
                value={role}
                onChange={(e) => setRole(e.target.value)}/>

                <input type="password" className="border border-black outline-none p-[5px] rounded-sm w-[30vw]"
                placeholder="Password"
                disabled
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                <input type="password" className="border border-black outline-none p-[5px] rounded-sm w-[30vw]"
                placeholder="Confirm Password"
                disabled
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>

                <button className="w-[200px] h-[50px] border border-black rounded-[5px] bg-[hsl(256,26%,30%)] text-white hover:bg-[hsl(256,26%,20%)]"
                onClick={handleUpdate}>
                    Update
                </button>

                {
                    error && <div className="text-red-500">Password mismatch!!</div>
                }
                {
                    success && <div className="text-green-700">Account Successfully Updated</div>
                }
            </div>
        </div>
    )
}


export default Profile