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
        <div className="p-[50px] bg-[#f5f5f5]">
            <div className="flex flex-col justify-center items-start gap-[15px] p-[20px]">
                <h1 className="text-center w-[100%] text-4xl font-bold text-[hsl(256,26%,20%)]">User Information</h1>
                <div className="flex justify-center items-center gap-[5px]">
                    <span className="font-bold">Avatar: </span>
                    <img src={user?.avatar} className="bg-black w-[50px] h-[50px] rounded-full"></img>
                </div>

                <div>
                    <span className="font-bold">Username: </span>
                    <span>{user?.username}</span>
                </div>

                <div>
                    <span className="font-bold">Email: </span>
                    <span>{user?.email}</span>
                </div>

                <button className="bg-red-500 p-3 rounded-md"
                onClick={handleDelete}>
                    Delete Account
                </button>
            </div>


            <div className="flex flex-col">
                <h1 className="text-center font-bold text-3xl my-7 text-[hsl(256,26%,20%)]">Lands Uploaded</h1>
                {/*Lands */}
                <div className="flex flex-wrap gap-[10px] justify-center">
                    {/*Land */}
                    {user?.post && (user?.post).map((post, idx) => (
                        <div className="flex flex-col justify-center items-center gap-[10px] border border-[hsl(256,26%,30%)] rounded-md w-[30%] cursor-pointer"
                        key={idx}>
                        <img src={post.images[0] || undefined} className="bg-black w-[100%] h-[200px] rounded-md"></img>
                        <div className="flex flex-col justify-between items-satrt gap-[10px]">
                            <span>{post.title}</span>
                            <span>{post.city}</span>
                            <span>₵{post.price}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>


            <div className="flex flex-col">
                <h1 className="text-center font-bold text-3xl my-7 text-[hsl(256,26%,20%)]">Lands Saved</h1>
                {/*Lands */}
                <div className="">
                    {/*Land */}
                    {savedPosts && savedPosts.map((post, idx) => (
                        <div className="flex flex-col justify-center items-center gap-[10px] border border-[hsl(256,26%,30%)] rounded-md w-[30%] cursor-pointer"
                        key={idx}>
                        <img src={post.images[0] || undefined} className="bg-black w-[100%] h-[200px] rounded-md"></img>
                        <div className="flex flex-col justify-between items-satrt gap-[10px]">
                            <span>{post.title}</span>
                            <span>{post.city}</span>
                            <span>₵{post.price}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default UserProfile