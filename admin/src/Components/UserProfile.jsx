import { useEffect, useState } from "react"
import { useUserStore } from "../Utils/Store"
import apiRequest from "../Libs/apiRequest"
import { GET_CLIENT_URL, GET_POSTS_DISCRTETE_URL } from "../Utils/Constants"


function UserProfile(){
    const [user, setUser] = useState(undefined)
    const [savedPosts, setSavedPosts] = useState([])
    const [userDone, setUserDone] = useState(false)
    const {client} = useUserStore()

    useEffect(() => {
        if(user){
            return
        }

        const getUser = async () => {
            try{
                const res = await apiRequest(`${GET_CLIENT_URL}/${client}`, {withCredentials: true})
                console.log("res: ", res.data)

                if(res.status === 200 && res.data){
                    setUser(res.data)
                    setUserDone(true)
                }

            }catch(e){
                console.log(e)
            }
        }
        getUser()
    }, [user])


    useEffect(() => {
       if(!userDone){
        return
       }

        const getSavedPosts = async (ids) => {
            try{
                const res = await apiRequest(GET_POSTS_DISCRTETE_URL, {params: {ids},withCredentials: true})
                

                if(res.status === 200 && res.data){
                    setSavedPosts(res.data)
                }
                return res.data

            }catch(e){
                console.log(e)
            }
        }

        const wrapper = async () => {
            const ids = (user?.savedPosts)?.map(p => (p.postId))
            const posts = await getSavedPosts(ids)
            console.log("savedPosts: ", posts)
        }

        wrapper()

    }, [userDone])


    

    const handleDelete = async () => {
        try{

        }catch(e){
            console.log(e)
        }
    }


    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">User Profile</h1>
                <p className="text-gray-600">Detailed view of user account and activities</p>
            </div>

            {user ? (
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* User Information Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">User Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Avatar and Basic Info */}
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    {user?.avatar ? (
                                        <img 
                                            src={user.avatar} 
                                            alt="User Avatar"
                                            className="w-20 h-20 rounded-full object-cover border-4 border-blue-200"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-2xl font-bold">
                                                {user?.username?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{user?.username}</h3>
                                    <p className="text-gray-600">{user?.email}</p>
                                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                                        ✅ Active User
                                    </span>
                                </div>
                            </div>

                            {/* Account Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{user?.post?.length || 0}</div>
                                    <div className="text-sm text-blue-800">Lands Posted</div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-purple-600">{savedPosts?.length || 0}</div>
                                    <div className="text-sm text-purple-800">Lands Saved</div>
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                                <h3 className="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
                                <p className="text-red-700 text-sm mb-4">
                                    Permanently delete this user account and all associated data. This action cannot be undone.
                                </p>
                                <button 
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                    onClick={handleDelete}
                                >
                                    🗑️ Delete Account
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Lands Uploaded */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Lands Uploaded</h2>
                        {user?.post && user.post.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {user.post.map((post, idx) => (
                                    <div 
                                        key={idx}
                                        className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                    >
                                        <div className="aspect-video bg-gray-200 relative">
                                            {post.images && post.images[0] ? (
                                                <img 
                                                    src={post.images[0]} 
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    🏘️ No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                                            <p className="text-gray-600 text-sm mb-1">📍 {post.city}</p>
                                            <p className="text-green-600 font-bold">₵{post.price?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <div className="text-6xl mb-4">🏘️</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No lands uploaded</h3>
                                <p>This user hasn't posted any land listings yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Lands Saved */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Saved Lands</h2>
                        {savedPosts && savedPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedPosts.map((post, idx) => (
                                    <div 
                                        key={idx}
                                        className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                    >
                                        <div className="aspect-video bg-gray-200 relative">
                                            {post.images && post.images[0] ? (
                                                <img 
                                                    src={post.images[0]} 
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    🏘️ No Image
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-full">
                                                ⭐
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                                            <p className="text-gray-600 text-sm mb-1">📍 {post.city}</p>
                                            <p className="text-green-600 font-bold">₵{post.price?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <div className="text-6xl mb-4">⭐</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved lands</h3>
                                <p>This user hasn't saved any land listings yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading user profile...</p>
                    </div>
                </div>
            )}
        </div>
    )
}


export default UserProfile