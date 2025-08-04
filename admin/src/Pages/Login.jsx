import { useState } from "react"
import apiRequest from "../Libs/apiRequest"
import { SIGNIN_URL } from "../Utils/Constants"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../Utils/Store"

function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const {setUserInfo} = useUserStore()
    const navigate = useNavigate()

    const handleSignin = async () => {
        try{
            const res = await apiRequest.post(SIGNIN_URL, {email, password}, {withCredentials: true})

            if(res.status === 200 && res.data){
                setUserInfo(res.data)
                navigate("/")
            }
        }catch(e){
            console.log(e)
            setError(true)
        }
    }


    return(
        <div className="flex justify-center items-center h-[100vh]">
            <div className="flex flex-col justify-center items-center gap-7 bg-[hsl(216,30%,68%)] p-[50px] rounded-md">
                <input type="email" className="border border-black outline-none p-[5px] rounded-sm w-[20vw]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="border border-black outline-none p-[5px] rounded-sm w-[20vw]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                <button className="w-[150px] h-[50px] border border-black rounded-[5px] bg-[hsl(256,26%,30%)] text-white hover:bg-[hsl(256,26%,20%)]"
                onClick={handleSignin}>
                    Signin
                </button>
                {error && <p className="text-red-500">Invalid Credentials</p>}
            </div>
        </div>
    )
}


export default Login