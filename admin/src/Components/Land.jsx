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
        <div className="flex p-[10px] bg-[#f5f5f5] h-screen">
            <div className="flex flex-1 flex-col gap-5 overflow-y-scroll h-[95vh] px-5">
                <div className="w-[100%] h-[40vh] flex-shrink-0">
                    <img src={undefined} alt="Land Picture" className="w-[100%] h-[100%] bg-black"></img>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-[10px]">
                        <div>{landInfo?.title}</div>
                        <div>{landInfo?.city}</div>
                        <div>₵ {landInfo?.price}</div>
                    </div>
                    <div>
                        <img src={landInfo?.images} alt="Land Picture" className="w-[100%] h-[100%] bg-black"></img>
                    </div>
                </div>
                <div>Desc Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsam vel, necessitatibus eos error eaque mollitia veniam nam, inventore facere quis, explicabo blanditiis a cum officiis eum dignissimos neque saepe! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, expedita quasi obcaecati laborum debitis natus ad necessitatibus, inventore voluptate sunt eligendi sint nulla repellendus ullam possimus ipsum, excepturi non architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi odio recusandae accusantium deserunt hic consequuntur necessitatibus nam inventore veritatis doloremque omnis dolorum beatae, exercitationem sequi, velit tenetur rem quibusdam explicabo. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo adipisci impedit vel dolorem a cupiditate vitae nulla amet repellendus, illo consequatur. Laborum tempora nemo amet cupiditate quidem quam, vitae aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quia vel recusandae qui deleniti exercitationem est, nemo architecto provident, perspiciatis quod accusantium et at amet, ratione dolore ab asperiores quis.

                </div>
            </div>



            {/*RIGHT*/}
            <div className="flex flex-col gap-[35px] p-[20px] bg-[#fcf5f3] w-[30vw]">
                <div>
                    <h1 className="font-bold text-xl mb-3 text-[hsl(256,26%,20%)]">General</h1>
                    <div className="flex flex-col justify-between h-[30vh] bg-white p-3 border rounded-md">
                    <div>
                        <span>Name: {landInfo?.user?.username}</span>
                       </div>

                       <div>
                        <span>Email: {landInfo?.user?.email}</span>
                       </div>

                       <div>
                        <span>Number: </span>
                       </div>

                       <div>
                        <span>Price: </span><span>₵{landInfo?.price}</span>
                       </div>

                       <div>
                        <span>City: </span><span>{landInfo?.city}</span>
                       </div>

                       <div>
                        <span>Size: </span><span>{landInfo?.postDetail?.size} sqft</span>
                       </div>

                       <div>
                        <span>Status: </span><span className={landInfo?.status == "progress" && "text-yellow-500" || landInfo?.status == "verified" && "text-green-500" || landInfo?.status == "rejected" && "text-red-500"}>{landInfo?.status}</span>
                       </div>
                    </div>
                </div>
                <div>
                    <h1 className="font-bold text-xl mb-3 text-[hsl(256,26%,20%)]">Location</h1>
                    <div>
                        { landInfo &&
                            <MyMap info={{latitude: landInfo?.latitude, longitude: landInfo?.longitude, city: landInfo?.city}}/>
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center mt-[20px]">
                    <button className={`${landInfo?.status == "progress" && "hidden"} w-[100px] h-[50px] rounded-md bg-yellow-500`}
                    onClick={progress}>
                        Progress
                    </button>


                    <button className={`${landInfo?.status == "verified" && "hidden"} w-[100px] h-[50px] rounded-md bg-green-500`}
                    onClick={verify}>
                        Verify
                    </button>



                    <button className={`${landInfo?.status == "rejected" && "hidden"} w-[100px] h-[50px] rounded-md bg-red-500`}
                    onClick={reject}>
                       Reject
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Land