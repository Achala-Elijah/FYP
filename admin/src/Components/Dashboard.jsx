import { useEffect, useState } from "react"
import apiRequest from "../Libs/apiRequest"
import { ADMINS_URL, LANDS_URL, USERS_URL } from "../Utils/Constants"

function Dashboard(){
    const [users, setUsers] = useState([])
    const [lands, setLands] = useState([])
    const [admins, setAdmins] = useState([])
    const [done, setDone] = useState(false)
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {

    const getUsers = async () => {
        try{
            const res = await apiRequest(USERS_URL, {withCredentials: true})
            if(res.status === 200){
                setUsers(res.data)
                return true
            }
        }catch(e){
            console.log(e)
        }
        return false
    }

    const getLands = async () => {
        try{
            const res = await apiRequest(LANDS_URL, {withCredentials: true})
            if(res.status === 200){
                setLands(res.data)
                return true
            }
        }catch(e){
            console.log(e)
        }
        return false
    }

    const getAdmins = async () => {
        try{
            const res = await apiRequest(ADMINS_URL, {withCredentials: true})
            if(res.status === 200){
                setAdmins(res.data)
                return true
            }
        }catch(e){
            console.log(e)
        }
        return false
    }

    const all = async () => {
        setLoading(true)
        await getUsers()
        await getLands()
        await getAdmins()
        setDone(true)
        setLoading(false)
    }

    all()
    }, [])


    const totalPrice = () => {
        let total = 0;
        const len = lands.length
        for( let i = 0; i < len; ++i){
            total += lands[i].price
        }

        return total
    }

    const verifiedLands = () => {
        let total = 0;
        const len = lands.length
        for( let i = 0; i < len; ++i){
            if(lands[i].status === "verified"){
                ++total
            }
        }
        return total
    }

    const rejectedLands = () => {
        let total = 0;
        const len = lands.length
        for( let i = 0; i < len; ++i){
            if(lands[i].status === "rejected"){
                ++total
            }
        }
        return total
    }

    const compute = async () => {
        if(done){
        const total_lands = lands.length
        const total_users = users.length
        const total_admins = admins.length
        const total_verified = verifiedLands()
        const total_rejected = rejectedLands()
        const total_verified_percent = total_lands > 0 ? (total_verified/total_lands) * 100 : 0
        const total_rejected_percent = total_lands > 0 ? (total_rejected/total_lands) * 100 : 0
        const average_price = total_lands > 0 ? totalPrice()/total_lands : 0
        const average_user = total_users > 0 ? total_lands/total_users : 0
        const users_per_admin = total_admins > 0 ? total_users/total_admins : 0
        const lands_per_admin = total_admins > 0 ? total_lands/total_admins : 0

        setInfo({
            total_lands,
            total_users,
            total_admins,
            total_verified,
            total_rejected,
            total_verified_percent,
            total_rejected_percent,
            average_price,
            average_user,
            users_per_admin,
            lands_per_admin,
        })
        setDone(false)
    }
    }

    compute()

    const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
        <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                    <p className={`text-3xl font-bold ${color} mb-1`}>{value}</p>
                    {subtitle && <p className="text-gray-400 text-xs">{subtitle}</p>}
                </div>
                <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('600', '100')} ${color}`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-xs">
                    <span className={`flex items-center ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.positive ? '↗' : '↘'} {trend.value}
                    </span>
                    <span className="text-gray-500 ml-2">vs last month</span>
                </div>
            )}
        </div>
    )

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Lands" 
                    value={info.total_lands || 0}
                    icon="🏘️"
                    color="text-blue-600"
                />
                <StatCard 
                    title="Total Users" 
                    value={info.total_users || 0}
                    icon="👥"
                    color="text-green-600"
                />
                <StatCard 
                    title="Total Admins" 
                    value={info.total_admins || 0}
                    icon="👤"
                    color="text-purple-600"
                />
                <StatCard 
                    title="Verification Rate" 
                    value={`${(info.total_verified_percent || 0).toFixed(1)}%`}
                    subtitle={`${info.total_verified || 0} verified`}
                    icon="✅"
                    color="text-emerald-600"
                />
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    title="Lands Verified" 
                    value={info.total_verified || 0}
                    subtitle={`${(info.total_verified_percent || 0).toFixed(1)}% of total`}
                    icon="✅"
                    color="text-green-600"
                />
                <StatCard 
                    title="Lands Rejected" 
                    value={info.total_rejected || 0}
                    subtitle={`${(info.total_rejected_percent || 0).toFixed(1)}% of total`}
                    icon="❌"
                    color="text-red-600"
                />
                <StatCard 
                    title="Average Land Price" 
                    value={`₵${(info.average_price || 0).toLocaleString()}`}
                    icon="💰"
                    color="text-yellow-600"
                />
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Average Lands per User" 
                    value={(info.average_user || 0).toFixed(2)}
                    icon="📊"
                    color="text-indigo-600"
                />
                <StatCard 
                    title="Users per Admin" 
                    value={(info.users_per_admin || 0).toFixed(0)}
                    icon="👥"
                    color="text-cyan-600"
                />
                <StatCard 
                    title="Lands per Admin" 
                    value={(info.lands_per_admin || 0).toFixed(0)}
                    icon="🏘️"
                    color="text-pink-600"
                />
            </div>
        </div>
    )
}

export default Dashboard