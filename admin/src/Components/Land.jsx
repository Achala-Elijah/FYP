import { useEffect, useState } from "react"
import { useUserStore } from "../Utils/Store"
import MyMap from "./Map"
import apiRequest from "../Libs/apiRequest"
import { GET_POST_URL, STATUS_URL } from "../Utils/Constants"


function Land(){
    const [landInfo, setLandInfo] = useState(undefined)
    const {selectedOption, setSelectedOption, land} = useUserStore()

    useEffect(() => {
        const getLand = async () => {
            try{
                const res = await apiRequest(GET_POST_URL, {params: {id: land}, withCredentials: true})
                console.log("Land: ", res.data)

                if(res.status === 200){
                    setLandInfo(res.data)
                }
            }catch(e){
                console.log(e)
            }
        }

        getLand()
    }, [])


    const verify = async () => {
        try{
            const res = await apiRequest.put(STATUS_URL, {}, {params: {status: "verified", id: landInfo.id}, withCredentials: true})

            if(res.status == 200){

            }
        }catch(e){
            console.log(e)
        }
    }

    const reject = async () => {
        try{
            const res = await apiRequest.put(STATUS_URL, {}, {params: {status: "rejected", id: landInfo.id}, withCredentials: true})

            if(res.status == 200){
                
            }
        }catch(e){
            console.log(e)
        }
    }


    const progress = async () => {
        try{
            const res = await apiRequest.put(STATUS_URL, {}, {params: {status: "progress", id: landInfo.id}, withCredentials: true})

            if(res.status == 200){
                
            }
        }catch(e){
            console.log(e)
        }
    }


    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
                <button 
                    className="mb-4 flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => setSelectedOption('lands')}
                >
                    ← Back to Lands
                </button>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Land Details</h1>
                <p className="text-gray-600">Review and manage land listing information</p>
            </div>

            {landInfo ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="aspect-video bg-gray-200 relative">
                                {landInfo?.images && landInfo.images[0] ? (
                                    <img 
                                        src={landInfo.images[0]} 
                                        alt={landInfo.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">🏘️</div>
                                            <p>No Image Available</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Land Information */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{landInfo?.title || 'Untitled Land'}</h2>
                                    <div className="flex items-center text-gray-600 space-x-4">
                                        <span className="flex items-center">📍 {landInfo?.city}</span>
                                        <span className="flex items-center">💰 ₵{landInfo?.price?.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                        landInfo?.status === 'verified' 
                                            ? 'bg-green-100 text-green-800' 
                                            : landInfo?.status === 'progress' 
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {landInfo?.status === 'verified' ? '✅ Verified' : 
                                         landInfo?.status === 'progress' ? '⏳ In Progress' : '❌ Rejected'}
                                    </span>
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    {landInfo?.postDetail?.desc || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsam vel, necessitatibus eos error eaque mollitia veniam nam, inventore facere quis, explicabo blanditiis a cum officiis eum dignissimos neque saepe! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, expedita quasi obcaecati laborum debitis natus ad necessitatibus, inventore voluptate sunt eligendi sint nulla repellendus ullam possimus ipsum, excepturi non architecto!'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Owner Information */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-medium">
                                            {landInfo?.user?.username?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{landInfo?.user?.username}</p>
                                        <p className="text-sm text-gray-600">{landInfo?.user?.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Price:</span>
                                    <span className="font-semibold text-green-600">₵{landInfo?.price?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">City:</span>
                                    <span className="font-medium">{landInfo?.city}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Size:</span>
                                    <span className="font-medium">{landInfo?.postDetail?.size || 'N/A'} sqft</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`font-medium ${
                                        landInfo?.status === 'progress' ? 'text-yellow-600' :
                                        landInfo?.status === 'verified' ? 'text-green-600' :
                                        'text-red-600'
                                    }`}>
                                        {landInfo?.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Location Map */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                            <div className="rounded-lg overflow-hidden">
                                {landInfo && (
                                    <MyMap info={{
                                        latitude: landInfo?.latitude, 
                                        longitude: landInfo?.longitude, 
                                        city: landInfo?.city
                                    }}/>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                            <div className="space-y-3">
                                {landInfo?.status !== "progress" && (
                                    <button 
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                                        onClick={progress}
                                    >
                                        ⏳ Mark as In Progress
                                    </button>
                                )}

                                {landInfo?.status !== "verified" && (
                                    <button 
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                                        onClick={verify}
                                    >
                                        ✅ Verify Land
                                    </button>
                                )}

                                {landInfo?.status !== "rejected" && (
                                    <button 
                                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                                        onClick={reject}
                                    >
                                        ❌ Reject Land
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading land details...</p>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Land