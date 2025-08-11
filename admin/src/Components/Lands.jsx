import { useEffect, useState } from "react"
import apiRequest from "../Libs/apiRequest"
import { LANDS_URL } from "../Utils/Constants"
import { useUserStore } from "../Utils/Store"


function Lands(){

    // const makeUp = [
    //     {
    //         id: 1,
    //         city: "Ayeduase",
    //         status: "verified",
    //         username: "Harry Peter",
    //         price: 500,
    //         createdAt: "2025-05-28",
    //     },
    //     {
    //         id: 2,
    //         city: "Kasoa",
    //         status: "verified",
    //         username: "Ava Jackson",
    //         price: 700,
    //         createdAt: "2024-05-28",
    //     },
    //     {
    //         id: 3,
    //         city: "Yakson Town",
    //         status: "rejected",
    //         username: "Jannet Sun",
    //         price: 650,
    //         createdAt: "2022-05-28",
    //     },
    //     {
    //         id: 4,
    //         city: "Amakrom",
    //         status: "Progress",
    //         username: "Tom Kater",
    //         price: 800,
    //         createdAt: "2025-05-28",
    //     },
    //     {
    //         id: 5,
    //         city: "Kejetia",
    //         status: "verified",
    //         username: "Harry Peter",
    //         price: 550,
    //         createdAt: "2025-04-28",
    //     },
    //     {
    //         id: 6,
    //         city: "James Town",
    //         status: "verified",
    //         username: "Tonni Jay",
    //         price: 750,
    //         createdAt: "2023-04-8",
    //     },
    //     {
    //         id: 7,
    //         city: "Ayeduase",
    //         status: "verified",
    //         username: "Harry Peter",
    //         price: 570,
    //         createdAt: "2025-05-28",
    //     },
    //     {
    //         id: 8,
    //         city: "New Town",
    //         status: "Progress",
    //         username: "Sammy Sam",
    //         price: 870,
    //         createdAt: "2025-05-28",
    //     },
    //     {
    //         id: 9,
    //         city: "KFC Town",
    //         status: "verified",
    //         username: "Derry keddy",
    //         price: 500,
    //         createdAt: "2025-05-28",
    //     },
    //     {
    //         id: 10,
    //         city: "Ayeduase",
    //         status: "verified",
    //         username: "Harry Peter",
    //         price: 500,
    //         createdAt: "2025-05-28",
    //     },
    // ]
    const [id, setId] = useState("")
    const [city, setCity] = useState("")
    const [status, setStatus] = useState("")
    const [date, setDate] = useState("")
    const [owner, setOwner] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")

    const [lands, setLands] = useState([])
    const {setSelectedOption, selectedOption, land, setLand} = useUserStore()

    useEffect(() => {
        const handleSearch = async () => {
            const data = {
                id: id || null,
                city: city || null,
                status: status || null,
                date: date || null,
                owner: owner || null,
                minPrice: minPrice || null,
                maxPrice: maxPrice || null
            }
    
            try{
                const res = await apiRequest.get(LANDS_URL, {params: data, withCredentials: true})
                if(res.status === 200 && res.data){
                    setLands(res.data)
                }
                console.log(res.data)
            }catch(e){
                console.log(e)
            }
        }

        handleSearch()
        
    }, [])

    const handleSearch = async () => {
        const data = {
            id: id || null,
            city: city || null,
            status: status || null,
            date: date || null,
            owner: owner || null,
            minPrice: minPrice || null,
            maxPrice: maxPrice || null
        }

        try{
            const res = await apiRequest.get(LANDS_URL, {params: data, withCredentials: true})
            if(res.status === 200 && res.data){
                setLands(res.data)
            }
            console.log(res.data)
        }catch(e){
            console.log(e)
        }
    }

    const handleLandClick = (e) => {
        const id = e.currentTarget.id
        setSelectedOption("land")
        setLand(id)
        console.log(id)
    }




    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Land Management</h1>
                <p className="text-gray-600">Manage and monitor all land listings</p>
            </div>
            
            {/* Search Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="verified">Verified</option>
                            <option value="progress">In Progress</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Enter city" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Owner name"
                            value={owner} 
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                        <input 
                            type="number" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Min price"
                            value={minPrice} 
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                        <input 
                            type="number" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Max price"
                            value={maxPrice} 
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                    <div className="flex items-end">
                        <button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                            onClick={handleSearch}
                        >
                            🔍 Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
                    <div className="grid grid-cols-6 gap-4 font-semibold">
                        <div className="text-center">#</div>
                        <div className="text-center">City</div>
                        <div className="text-center">Price</div>
                        <div className="text-center">Status</div>
                        <div className="text-center">Date</div>
                        <div className="text-center">Owner</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                    {lands && lands.length > 0 ? (
                        lands.map((land, idx) => (
                            <div 
                                className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group" 
                                key={idx}
                                id={land.id}
                                onClick={handleLandClick}
                            >
                                <div className="text-center text-gray-600 font-medium">{idx + 1}</div>
                                <div className="text-center">
                                    <span className="text-gray-900 font-medium">{land.city}</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-green-600 font-bold">₵{land.price?.toLocaleString()}</span>
                                </div>
                                <div className="text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        land.status === 'verified' 
                                            ? 'bg-green-100 text-green-800' 
                                            : land.status === 'progress' 
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {land.status === 'verified' ? '✅ Verified' : 
                                         land.status === 'progress' ? '⏳ In Progress' : '❌ Rejected'}
                                    </span>
                                </div>
                                <div className="text-center text-gray-600">
                                    {new Date(land.createdAt).toLocaleDateString()}
                                </div>
                                <div className="text-center">
                                    <span className="text-gray-900 font-medium">{land.user?.username}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center text-gray-500">
                            <div className="text-6xl mb-4">🏘️</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No lands found</h3>
                            <p>Try adjusting your search criteria or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Lands