import { useState } from "react"
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
        <div className="flex flex-col bg-[hsl(216,30%,68%)]">
            <h1 className="flex justify-center items-center text-[2em] mt-[30px]">LANDS</h1>
            
            <div className="h-[50px] flex justify-center items-center gap-[20px] bg-[hsl(216,30%,68%)] py-[0px] mt-[20px]">

                <select className="w-[10%] h-[100%] outline-none rounded-[5px] p-[10px]" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select option</option>
                    <option value="verified">verified</option>
                    <option value="progress">progress</option>
                    <option value="rejected">rejected</option>
                </select>
                <input type="text" className="w-[13%] h-[100%] outline-none rounded-[5px] p-[10px]" placeholder="city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}/>

                <input type="text" className="w-[13%] h-[100%] outline-none rounded-[5px] p-[10px]" placeholder="owner"
                value={owner} 
                onChange={(e) => setOwner(e.target.value)}/>

                <input type="number" className="w-[13%] h-[100%] outline-none rounded-[5px] p-[10px]" placeholder="min price"
                value={minPrice} 
                onChange={(e) => setMinPrice(e.target.value)}/>

                <input type="number" className="w-[13%] h-[100%] outline-none rounded-[5px] p-[10px]" placeholder="max price"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)}/>

                <button className="w-[13%] h-[100%] border border-black rounded-[5px] bg-[hsl(256,26%,30%)] text-white hover:bg-[hsl(256,26%,20%)]"
                onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div className="mt-[50px]">
                <div className="flex bg-[hsl(256,26%,30%)] py-[10px] text-white">
                    <div className="w-[10%] flex justify-center items-center">
                        COUNT
                    </div>
                    <div className="w-[15%] flex justify-center items-center">
                        CITY
                    </div>
                    <div className="w-[10%] flex justify-start items-center">
                        PRICE
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                        STATUS
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                        DATE
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                        OWNER
                    </div>
                </div>
                 {/*LANDS*/}
                <div className="flex flex-col bg-[hsl(216,30%,68%)]">
                    {
                        lands && lands.map((land, idx) => (
                            <div className="flex cursor-pointer py-[10px] hover:bg-[hsl(216,30%,48%)]" 
                            key={idx}
                            id={land.id}
                            onClick={handleLandClick}>
                                <div className="w-[10%] flex justify-center items-center">
                                    {idx}
                                </div>
                                <div className="w-[15%] flex justify-center items-center">
                                    {land.city}
                                </div>
                                <div className="w-[10%] flex justify-start items-center">
                                    ₵ {land.price}
                                </div>
                                <div className="w-[20%] flex justify-center items-center">
                                    {land.status}
                                </div>
                                <div className="w-[20%] flex justify-center items-center">
                                    {(land.createdAt).slice(0, 10)}
                                </div>
                                <div className="w-[20%] flex justify-center items-center">
                                    {land.user.username}
                                </div>
                    </div>
                        ))
                    }
                </div>
               
            </div>
        </div>
    )
}


export default Lands