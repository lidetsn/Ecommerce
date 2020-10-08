import User from "../models/userModel.js"
import generateToken  from "../utils/generateToken.js"


const authUser=async (req,res,next)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
         if(user && user.matchPassword(password)){
                  res.json({
                      _id:user._id,
                      name:user.name,
                      email:user.email,
                      isAdmin:user.isAdmin,
                      token: generateToken(user._id)

                  })

         }
         else{
             res.status(401)
             throw new Error("Invalid email or password")
            //  const error=new Error("Invalid email or password")
            //  next(error)
         }
    } catch (error) {
       next(error)
    }
}
const registerUser=async (req,res,next)=>{
    const {name,email,password}=req.body
    try {
                const userExist=await User.findOne({email})
                if(userExist){
                    res.status(400)
                    throw new Error("User already exist")
                }
                const user=await User.create({
                    name,
                    email,
                    password
                })
                if(user){
                    res.status(201).json({
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        isAdmin:user.isAdmin,
                        token: generateToken(user._id)
  
                    })
                }
                else{
                    res.status(400)
                    throw new Error("Invalid user data")
                }
       
    } catch (error) {
       next(error)
    }
}

const getUserProfile=async (req,res,next)=>{
    try {
        const user=await User.findById(req.user._id)
        if(user){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                
            })

        }else{
            res.status(404)
            throw new Error("User not found")
        }
        res.json(req.user)
    } catch (error) {
        
    }
   
}



export {authUser, getUserProfile,registerUser}