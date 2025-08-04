import { useState } from "react"
import apiRequest from "../Libs/apiRequest"
import { SINGUP_URL } from "../Utils/Constants"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../Utils/Store"

function CreateAdmin(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("admin")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const {setUserInfo} = useUserStore()

    const handleRegister = async () => {
        try{
            if(handleConfirmPassword()){
                return
            }

            console.log("in")
            const res = await apiRequest.post(SINGUP_URL, {username, email, password, role}, {withCredentials: true})

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
            <h1 className="font-bold text-3xl">CREATE ADMIN ACCOUNT</h1>

            <input type="text" className="border border-black outline-none p-[5px] rounded-sm w-[30vw]"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>

                <input type="email" className="border border-black outline-none p-[5px] rounded-sm w-[30vw]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <select className="border border-black outline-none p-[5px] rounded-sm w-[30vw]" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">admin</option>
                    <option value="superAdmin">superAdmin</option>
                </select>

                <input type="password" className="border border-black outline-none p-[5px] rounded-sm w-[30vw]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                <input type="password" className="border border-black outline-none p-[5px] rounded-sm w-[30vw]"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>

                <button className="w-[200px] h-[50px] border border-black rounded-[5px] bg-[hsl(256,26%,30%)] text-white hover:bg-[hsl(256,26%,20%)]"
                onClick={handleRegister}>
                    Signin
                </button>

                {
                    error && <div className="text-red-500">Password mismatch!!</div>
                }
                {
                    success && <div className="text-green-700">Account Successfully Created</div>
                }
            </div>
        </div>
    )
}


export default CreateAdmin