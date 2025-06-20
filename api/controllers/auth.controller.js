import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js"


export const register = async (req, res) => {
    const {username, email, password} = req.body

    try{
    //HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)


    //CREATE A NEW USER AND SAVE IT TO THE DB
    const newUser = await prisma.user.create({
        data: {
            username, 
            email, 
            password: hashedPassword
        }
    })
    
    res.status(201).json({message: "User successfully created"})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to create user!"})
    }
}








export const login = async (req, res) => {
    const {username, password} = req.body

    try{

        //CHECK IF USER EXIST
        const user = await prisma.user.findUnique({
            where: {username}
        })
        if(!user) return res.status(401).json({message: "Invalid Credentials!"})


        //CHECK IF PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if(!isPasswordValid) return res.status(401).json({message: "Invalid Credentials!"})


        //GENERATE COOKIE TOKEN AND SEND IT TO THE USER
        const age = 1000 * 60 * 60 * 24 * 7

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: age})

        const {password: userPassword, ...userInfo} = user

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age
        }
            ).status(200).json(userInfo)

    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to authenticate"})
    }
}






export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logout Successfully"})
}