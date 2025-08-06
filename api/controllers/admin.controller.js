import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js"





export const registerAdmin = async (req, res) => {
    const {username, email, password, role} = req.body
    console.log("role:", req.role)

    if(req.role != "superAdmin") return res.status(401).send("Not Authorized!")

    try{
    //HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)


    //CREATE A NEW USER AND SAVE IT TO THE DB
    const newAdmin = await prisma.admin.create({
        data: {
            username, 
            email, 
            password: hashedPassword,
            role
        }
    })
    
    res.status(200).json({message: "Admin account successfully created"})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to create Admin account!"})
    }
}







export const loginAdmin = async (req, res) => {
    const {email, password} = req.body

    try{

        //CHECK IF USER EXIST
        const admin = await prisma.admin.findUnique({
            where: {email}
        })
        if(!admin) return res.status(401).json({message: "Invalid Credentials!"})
    
           


        //CHECK IF PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, admin.password)
        
        if(!isPasswordValid) return res.status(401).json({message: "Invalid Credentials!"})


        //GENERATE COOKIE TOKEN AND SEND IT TO THE USER
        const age = 1000 * 60 * 60 * 24 * 7

        const token = jwt.sign({id: admin.id, role: admin.role}, process.env.JWT_ADMIN_SECRET_KEY, {expiresIn: age})

        const {password: adminPassword, ...adminInfo} = admin

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age
        }
            ).status(200).json(adminInfo)


    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to authenticate"})
    }
}


export const getUser = async (req, res) => {
    try{
        const result = await prisma.admin.findUnique({
            where: {id: req.userId}
        })

        const {password, ...user} = result
        console.log(user)

        return res.status(200).json(user)

    }catch(e){
        console.log(e)
    }
}



export const getPosts = async (req, res) => {
    const query = req.query
    console.log("query", query)


    try{
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                status: query.status || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 100000000000000,
                },
                user:{
                      username: query.owner || undefined
                }
            },
            include: {
                user:{
                    select: {
                        username: true
                    }
                }
            }
        })
       
    res.status(200).json(posts)
       

        
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to get Posts"})
    }
}





export const getPostsDiscrete = async (req, res) => {
    const {ids} = req.query
    console.log("ids", ids)
    if(!(ids.length) || !ids){
        return res.status(200).json([])
    }

    try{
        const posts = await prisma.post.findMany({
            where: {
                id: {
                    in: ids,
                  },
            },
            include: {
                user:{
                    select: {
                        username: true
                    }
                }
            }
        })
       
    res.status(200).json(posts)
       

        
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to get Posts"})
    }
}




export const getPost = async (req, res) => {
    const {id} = req.query
    console.log("id: ", id)
    if(id !== 0 && !id){
        return res.status(200).json([])
    }

    try{
        const post = await prisma.post.findUnique({
            where: {id},
            include: {
                user:{
                    select: {
                        username: true,
                        email: true
                    }
                },
                postDetail: {
                    select: {
                        size: true
                    }
                }
            }
        })
       
    res.status(200).json(post)
       

        
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to get Post"})
    }
}







export const getUsers = async (req, res) => {
    const query = req.query
    try{
        const results = await prisma.user.findMany({
            where: {
                id: query.id || undefined,
                username: query.username || undefined,
                email: query.email || undefined,
                createdAt: query.date || undefined,
            }
        })
        const users = results.map(({ password, ...rest }) => rest);
        res.status(200).json(users)

    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to get users"})
    }
}




export const getClient = async (req, res) => {
    const id = req.params.id
    try{
        if(!id){
            return res.status(400).send("id not provided")
        }
        const results = await prisma.user.findUnique({
            where: {id},
            include: {
                post: true,
                savedPosts: true,
            }
        })

        if (!results) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...rest } = results
        res.status(200).json(rest)

    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to get users"})
    }
}




export const getAdmins = async (req, res) => {
    const query = req.query
    try{
        if(req.role !== "superAdmin") return res.status(401).send("Not Authorized!")
        const users = await prisma.admin.findMany({
            where: {
                id: query.id || undefined,
                username: query.username || undefined,
                email: query.email || undefined,
                createdAt: query.date || undefined,
                role: query.role || undefined,
            }
        })
        res.status(200).json(users)

    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to get users"})
    }
}





export const verifyPost = async (req, res) => {
    const {id, status} = req.query
    console.log("verify: ", id)
    try{
        const updatedPost = await prisma.post.update({
            where: {
               id
            },
            data: {
                status
            }
        })

        res.status(200).json(updatedPost)
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to verify post!"})
    }
}






export const logout = async (req, res) => {
    try{
        return res.clearCookie("token").status(200).json({message: "Logout Successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to logout"})
    }
}