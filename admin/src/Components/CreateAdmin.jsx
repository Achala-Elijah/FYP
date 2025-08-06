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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Admin Account</h1>
                <p className="text-gray-600">Add a new administrator to the system</p>
            </div>

            {/* Form Container */}
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Admin Account Details</h2>
                        <p className="text-gray-600">Fill in the information below to create a new admin account</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                value={role} 
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="admin">👤 Admin</option>
                                <option value="superAdmin">👑 Super Admin</option>
                            </select>
                            <p className="text-sm text-gray-500 mt-1">
                                {role === 'superAdmin' 
                                    ? 'Super Admin has full access to all features including admin management'
                                    : 'Admin has access to user and land management features'
                                }
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input 
                                type="password" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                            <input 
                                type="password" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <span className="text-red-600 mr-2">❌</span>
                                    <p className="text-red-700 font-medium">Password mismatch! Please ensure both passwords are identical.</p>
                                </div>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <span className="text-green-600 mr-2">✅</span>
                                    <p className="text-green-700 font-medium">Admin account successfully created!</p>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                                onClick={handleRegister}
                            >
                                🔐 Create Admin Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreateAdmin