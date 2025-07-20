import jwt from "jsonwebtoken"

export const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json({message: "Not Authenticated!"})

    jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY, async (err, payload) => {
        if(err) return res.status(403).json({message: "Invalid Token!"})
        req.userId = payload.id
        req.role = payload.role
        next()
})
}