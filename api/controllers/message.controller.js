import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";



export const addMessage = async (req, res) => {
    const tokenUserId = req.userId
    const chatId = req.params.chatId
    const text = req.body.text

    console.log("tokenUserId: ", tokenUserId, "chatId: ", chatId, "text: ", text)
    try{
        const chat = await prisma.chat.findFirst({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        })

        if(!chat){
            return res.status(404).json({message: "Chat not found!"})
        }

        const message = await prisma.message.create({
            data: {
                text,
                chatId,
                userId: tokenUserId
            }
        })

        await prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                seenBy: [tokenUserId],
                lastMessage: text
            }
        })
        res.status(200).json(message)
        
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to add Message"})
    }
}
