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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                <p className="text-gray-600">Manage your account information and settings</p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white text-3xl font-bold">
                                    {userInfo?.username?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{userInfo?.username}</h3>
                            <p className="text-gray-600 mb-4">{userInfo?.email}</p>
                            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                                userInfo?.role === 'superAdmin' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-blue-100 text-blue-800'
                            }`}>
                                {userInfo?.role === 'superAdmin' ? '👑 Super Admin' : '🛡️ Admin'}
                            </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-20">Status:</span>
                                    <span className="flex items-center text-green-600">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        Active
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-20">Joined:</span>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Settings Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Account Information</h2>
                            <p className="text-gray-600">Your account details are currently read-only for security purposes</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg cursor-not-allowed opacity-60"
                                    placeholder="Username"
                                    disabled
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg cursor-not-allowed opacity-60"
                                    placeholder="Email"
                                    disabled
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg cursor-not-allowed opacity-60"
                                    disabled
                                    value={role === 'superAdmin' ? 'Super Admin' : 'Admin'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-1">Role is assigned by system administrator</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                    <input 
                                        type="password" 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg cursor-not-allowed opacity-60"
                                        placeholder="New password"
                                        disabled
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg cursor-not-allowed opacity-60"
                                        placeholder="Confirm password"
                                        disabled
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <p className="text-xs text-gray-500">Password changes are currently disabled for security. Contact a super admin for password reset.</p>

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
                                        <p className="text-green-700 font-medium">Account successfully updated!</p>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button 
                                    className="w-full bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg cursor-not-allowed opacity-60"
                                    disabled
                                    onClick={handleUpdate}
                                >
                                    🔒 Updates Currently Disabled
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Profile