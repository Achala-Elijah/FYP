import express from "express"
import { registerAdmin, loginAdmin, getPosts } from "../controllers/admin.controller.js"
import { verifyAdminToken } from "../middlewear/verifyAdminToken.js"

const router = express.Router()

router.post("/register", verifyAdminToken, registerAdmin)
router.post("/login", loginAdmin)
//router.post("/logout", logout)
//router.post("/verify", verifyAdminToken, verifyLand)
//router.get("/getAdmins", verifyAdminToken, getAdmins)
//router.get("/getUsers", verifyAdminToken, getUsers)
router.get("/getPosts", verifyAdminToken, getPosts)





export default router