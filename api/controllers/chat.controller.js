import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";



export const getChats = async (req, res) => {
    const tokenUserId = req.userId
    console.log("userId: ", tokenUserId)

    try{
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        })
        console.log("chats: ", chats)

        for(const chat of chats){
            const receiverId = chat.userIDs.find(id => id !== tokenUserId)

            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId,
                },
                select: {
                    id: true,
                    username: true,
                     avatar: true
                }
            })
            chat.receiver = receiver
        }
        res.status(200).json(chats)
        
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to get Chats"})
    }
}





export const getChat = async (req, res) => {
    const tokenUserId = req.userId
    try{
        const chat = await prisma.chat.findFirst({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        })

        await prisma.chat.update({
            where: {
                id: req.params.id,
            },
            data: {
                seenBy: {
                    set: [tokenUserId]
                }
            }
        })
        res.status(200).json(chat)
        
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to get Chats"})
    }
}






export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        //Check if chat already exists (order of IDs doesn't matter)
    const existingChat = await prisma.chat.findFirst({
        where: {
          AND: [
            { userIDs: { has: tokenUserId } },
            { userIDs: { has: req.body.receiverId } },
          ],
        },
      });
  
      if (existingChat) {
        return res.status(400).json("Chat already exist!!");
      }





      const newChat = await prisma.chat.create({
        data: {
          userIDs: [tokenUserId, req.body.receiverId],
        },
      });
      res.status(200).json(newChat);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to add chat!" });
    }
  };
  






export const readChat = async (req, res) => {
    const tokenUserId = req.userId
    try{
        const chat = await prisma.chat.update({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },
            data: {
                seenBy: {
                    push: tokenUserId 
                }
            }
        })
        res.status(200).json(chat) 
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to read Chat"})
    }
}
