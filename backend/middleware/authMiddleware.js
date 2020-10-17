import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const protect=async (req,res,next)=>{
    let token
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token=req.headers.authorization.split(" ")[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.id).select("-password")
            // req.user=decoded
            // console.log(decoded)
          return   next()
        }
        else
        res.status(401) 
        throw new Error("not authorized, no token found")
    } catch (error) {
        const err=new Error('not authorized Token failed')
        next(err)
    }
}

const admin =(req,res,next)=>{

    try {
        if(req.user && req.user.isAdmin){
            next()
        }
        else{
            res.status(401)
            throw new Error("Not authorized as an admin")
        }
        
    } catch (error) {
        next(error)
    }
   
}

export {protect,admin}