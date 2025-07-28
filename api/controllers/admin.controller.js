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
    
    res.status(201).json({message: "Admin account successfully created"})
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





export const getPosts = async (req, res) => {
    const query = req.query


    try{
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 100000000000000,
                },
            }
        })
       
    res.status(200).json(posts)
       

        
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to get Posts"})
    }
}





export const getUsers = async (req, res) => {
    try{
        const results = await prisma.user.findMany()
        const users = results.map(({ password, ...rest }) => rest);
        res.status(200).json(users)

    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to get users"})
    }
}




export const getAdmins = async (req, res) => {
    try{
        if(req.role !== "superAdmin") return res.status(401).send("Not Authorized!")
        const users = await prisma.admin.findMany()
        res.status(200).json(users)

    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to get users"})
    }
}





export const verifyPost = async (req, res) => {
    const params = req.params.id
    try{
        const updatedPost = await prisma.post.update({
            where: {
               id: params
            },
            data: {
                status: "verified"
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