import { useEffect, useState } from "react"
import apiRequest from "../Libs/apiRequest"
import { ADMINS_URL, LANDS_URL, USERS_URL } from "../Utils/Constants"

function Dashboard(){
    const [users, setUsers] = useState([])
    const [lands, setLands] = useState([])
    const [admins, setAdmins] = useState([])
    const [done, setDone] = useState(false)
    const [info, setInfo] = useState({})

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
        await getUsers()
        await getLands()
        await getAdmins()
        setDone(true)
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
        console.log("len: ", len)
        for( let i = 0; i < len; ++i){
            if(lands[i].status === "verified"){
                ++total
            }
        }
        console.log("total: ", total)
        return total
    }



    const compute = async () => {
        if(done){
        const total_lands = lands.length
        const total_users = users.length
        const total_admins = admins.length
        const total_verified = verifiedLands()
        const total_rejected = total_lands - total_verified
        const total_verified_percent = (total_verified/total_lands) * 100
        const total_rejected_percent = (total_rejected/total_lands) * 100
        const average_price = totalPrice()/total_lands
        const average_user = total_lands/total_users
        const users_per_admin = total_users/total_admins
        const lands_per_admin = total_lands/total_admins

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

    return(
        <div className="p-[20px] bg-[#f5f5f5] h-[100vh] flex flex-col justify-around text-[hsl(256,26%,20%)]">
            <h1 className="text-center text-5xl font-bold text-[hsl(256,26%,30%)]">DASHBOARD</h1>

            <div className="flex justify-around items-center">
            <div className="w-[30%] h-[150px] flex flex-col justify-around items-center bg-blue-400 rounded-md text-2xl cursor-pointer">
                <div>Total Lands</div>
                <div className="font-bold text-3xl">{info.total_lands}</div>
                <div className="font-bold text-3xl"></div>
            </div>

            <div className="w-[32%] h-[150px] flex flex-col justify-around items-center bg-[#0d8d44] rounded-md text-2xl cursor-pointer">
                <div>Lands Verified</div>
                <div className="font-bold text-3xl">Total: {info.total_verified || 0}</div>
                <div className="font-bold text-3xl">{info.total_verified_percent || 0}%</div>
            </div>

            <div className="w-[30%] h-[150px] flex flex-col justify-around items-center bg-[hsl(216,30%,68%)] rounded-md text-2xl cursor-pointer">
                <div>Lands Rejected</div>
                <div className="font-bold text-3xl">Total: {info.total_rejected || 0}</div>
                <div className="font-bold text-3xl">{info.total_rejected_percent || 0}%</div>
            </div>
        </div>


        <div className="flex justify-around items-center">
            <div className="w-[30%] h-[150px] flex flex-col justify-around items-center bg-blue-400 rounded-md text-2xl cursor-pointer">
                <div>Total Users</div>
                <div className="font-bold text-3xl">{info.total_users || 0}</div>
                <div className="font-bold text-3xl"></div>
            </div>

            <div className="w-[32%] h-[150px] flex flex-col justify-around items-center bg-[#0d8d44] rounded-md text-2xl cursor-pointer">
                <div>Average Land Price</div>
                <div className="font-bold text-3xl">₵{info.average_price || 0}</div>
                <div className="font-bold text-3xl"></div>
            </div>

            <div className="w-[30%] h-[150px] flex flex-col justify-around items-center bg-[hsl(216,30%,68%)] rounded-md text-2xl cursor-pointer">
                <div>Average Lands/User</div>
                <div className="font-bold text-3xl">{(info.average_user)?.toFixed(2) || 0}</div>
                <div className="font-bold text-3xl"></div>
            </div>
        </div>



        <div className="flex justify-around items-center">
            <div className="w-[30%] h-[150px] flex flex-col justify-around items-center bg-blue-400 rounded-md text-2xl cursor-pointer">
                <div>Total Admins</div>
                <div className="font-bold text-3xl">{info.total_admins}</div>
                <div className="font-bold text-3xl"></div>
            </div>

            <div className="w-[32%] h-[150px] flex flex-col justify-around items-center bg-[#0d8d44] rounded-md text-2xl cursor-pointer">
                <div>Users Per Admin</div>
                <div className="font-bold text-3xl">{info.users_per_admin}</div>
                <div className="font-bold text-3xl"></div>
            </div>

            <div className="w-[30%] h-[150px] flex flex-col justify-around items-center bg-[hsl(216,30%,68%)] rounded-md text-2xl cursor-pointer">
                <div>Lands Per Admin</div>
                <div className="font-bold text-3xl">{info.lands_per_admin}</div>
                <div className="font-bold text-3xl"></div>
            </div>
        </div>


        </div>
        
    )
}

export default Dashboard