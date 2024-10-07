import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../schemas/userModel.js"

export const protect = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.userId).select('-password')
            next()
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, Invalid token')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
