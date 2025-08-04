import express from "express"
import { registerAdmin, 
    loginAdmin, 
    getPosts, 
    getUsers,
    getAdmins,
    verifyPost,
    logout,
    getUser,
    getClient,
    getPostsDiscrete,
    getPost,
} from "../controllers/admin.controller.js"
import { verifyAdminToken } from "../middlewear/verifyAdminToken.js"

const router = express.Router()

router.post("/register", verifyAdminToken, registerAdmin)
router.post("/login", loginAdmin)
router.post("/logout", logout)
router.put("/verifyPost", verifyAdminToken, verifyPost)
router.get("/getAdmins", verifyAdminToken, getAdmins)
router.get("/getUser", verifyAdminToken, getUser)
router.get("/getUsers", verifyAdminToken, getUsers)
router.get("/getPosts", verifyAdminToken, getPosts)
router.get("/getClient/:id", verifyAdminToken, getClient)
router.get("/getPostsDiscrete", verifyAdminToken, getPostsDiscrete)
router.get("/getPost", verifyAdminToken, getPost)





export default router