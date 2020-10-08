//to change to es6 type add "type" :"module" in package.json
//and change the module.export to export default
// and node version should be 14.9.0 and above

// const express=require("express")
// const dotenv=require("dotenv")
// const products=require("./data/products")
import express from 'express'
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

// import products from"./data/products.js"
import connectDb from "./config/db.js"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js"

dotenv.config()
connectDb()
const app=express()
app.use(express.json())


app.use("/api/products/", productRoutes)
app.use("/api/users/", userRoutes)
app.use(notFound)
app.use(errorHandler)



const PORT=process.env.PORT||5000



app.listen(PORT,()=>{
        console.log(`server is running on port${PORT}`)
})