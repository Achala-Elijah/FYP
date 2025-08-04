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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
                    <p className="text-gray-600">Sign in to access the admin panel</p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm">❌ Invalid credentials. Please try again.</p>
                        </div>
                    )}

                    <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                        onClick={handleSignin}
                    >
                        Sign In
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">Admin access only</p>
                </div>
            </div>
        </div>
    )
}


export default Login