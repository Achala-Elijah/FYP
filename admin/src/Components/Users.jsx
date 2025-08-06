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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management</h1>
                <p className="text-gray-600">Manage and monitor all registered users</p>
            </div>
            
            {/* Search Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Enter username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Enter email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex items-end">
                        <button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                            onClick={handleSearch}
                        >
                            🔍 Search Users
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
                    <div className="grid grid-cols-4 gap-4 font-semibold">
                        <div className="text-center">#</div>
                        <div className="text-center">Username</div>
                        <div className="text-center">Email</div>
                        <div className="text-center">Join Date</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                    {users && users.length > 0 ? (
                        users.map((user, idx) => (
                            <div 
                                className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group" 
                                key={idx}
                                id={user.id}
                                onClick={handleLandClick}
                            >
                                <div className="text-center text-gray-600 font-medium">{idx + 1}</div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 font-medium text-sm">
                                                {user.username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-gray-900 font-medium">{user.username}</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className="text-gray-700">{user.email}</span>
                                </div>
                                <div className="text-center text-gray-600">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center text-gray-500">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                            <p>Try adjusting your search criteria or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Users