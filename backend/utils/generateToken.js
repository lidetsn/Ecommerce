import jwt from "jsonwebtoken"

const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"30D"})
}

export default generateToken