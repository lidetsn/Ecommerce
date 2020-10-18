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
    
    } catch (error) {
        next(error)
    }
   
}
const updateUserProfile=async (req,res,next)=>{
    try {
        const user=await User.findById(req.user._id)
        if(user){
            user.name=req.body.name ||user.name
            user.email=req.body.email||user.email
            if(req.body.password){
                user.password=req.body.password||user.password
            }
            const updatedUser=await user.save()
            res.json({
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                isAdmin:updatedUser.isAdmin,
                token: generateToken(updatedUser._id)

            })
            
        }

        else{
            res.status(404)
            throw new Error("User not found")
        }
        res.json(req.user)
    } catch (error) {
        next(error)
    }
   
}
//get all users
//get/api/users
//private admin
const getUsers=async (req,res,next)=>{
    try {
        const users=await User.find({})
       if(users){
            res.json(users)

         }else{
            res.status(404)
             throw new Error("User not found")
         }
        
    } catch (error) {
       next(error) 
    }
   
}
//get user by id
//get/api/users/:id
//privat/admi
const getUserById=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id).select("-password")
       if(user){
            res.json(user)

         }else{
            res.status(404)
             throw new Error("User not found")
         }
        
    } catch (error) {
       next(error) 
    }
   
}

//update user 
//put//api/users/:id
//private /admin   this update is done by the admin
const updateUser=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        if(user){
            user.name=req.body.name ||user.name
            user.email=req.body.email||user.email
            user.isAdmin=req.body.isAdmin ===undefined?user.isAdmin:req.body.isAdmin  
          
            

            const updatedUser=await user.save()
            res.json({
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                isAdmin:updatedUser.isAdmin,
                

            })
            
        }

        else{
            res.status(404)
            throw new Error("User not found")
        }
        res.json(req.user)
    } catch (error) {
        next(error)
    }
   
}
// delete a user
//private /admin
const deleteUser=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
       if(user){
           await user.remove()
            res.json({message:"user removed"})

         }else{
            res.status(404)
             throw new Error("User not found")
         }
        
    } catch (error) {
       next(error) 
    }
   
}

export {authUser, 
       getUserProfile,
      registerUser,
      updateUserProfile,
      getUsers,
      deleteUser,
      getUserById,
      updateUser}