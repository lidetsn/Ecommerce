import Product  from "../models/productModel.js"

const getProducts=async (req,res,next)=>{
    try {
      const keyword=req.query.keyword?{
        name:{
          $regex:req.query.keyword,
          $options:"i"
        }
      }:{}
        const products=await Product.find({...keyword})     
             res.json(products)       
      } catch (error) {
         console.log(error.message)
         next(error)
        //  res.status(401).json(error) 
      }
}

const getProductById=async (req,res,next)=>{
    try {
        const product=await Product.findById(req.params.id)
        // const product=products.find(p=>p._id===req.params.id)
        if(product){
          res.json(product)
        }
        else{
         // const error=new Error("product not found");      
          res.status(404) 
          throw new Error("product not found sorry")
         // next(error)   
          
        }
        
      } catch (error) {
             console.log("error")
                  next(error)
        
      }
}
// delete product by id

//DELETE /api/products/:id
//private/admin
const deleteProduct=async (req,res,next)=>{
  try {
      const product=await Product.findById(req.params.id)
      // const product=products.find(p=>p._id===req.params.id)
      if(product){
       await  product.remove()
       res.json({message:"product removed"})
      }
      else{
       // const error=new Error("product not found");      
        res.status(404) 
        throw new Error("product not found sorry")
       // next(error)   
        
      }
      
    } catch (error) {
           console.log("error")
                next(error)
      
    }
}
//create product
//post api/products
//private/admin
const createProduct=async (req,res,next)=>{
  try {
      const product=new Product({
        name:"sample product",
        price:0,
        user:req.user._id,
        image:"/images/sample.jpg",
        brand:"sample brand",
        category:"sample category",
        countInstock:0,
        numReviews:0,
        description:"sample description"
      })
      const createdProduct=await product.save()
       res.status(201).json(createdProduct)
      
    } catch (error) {
           console.log("error")
                next(error)
      
    }
}
//update product
//put/api/produts/:id
//private/admin
const updateProduct=async (req,res,next)=>{
  try {

      const {
        name,
        price,
        user,
        image,
        brand,
        category,
        countInstock,
        numReviews,
        description
      }=req.body
      const product=await Product.findById(req.params.id)
      if(product){
       
        product.name=req.body.name===undefined?product.name:req.body.name
        product.price=req.body.price===undefined?product.price:req.body.price
        product. user=req.body.user===undefined?product.user:req.body.user
        product.image=req.body.image===undefined?product.image:req.body.image
        product.brand=req.body.brand===undefined?product.brand:req.body.brand
        product.category=req.body.category===undefined?product.category:req.body.category
        product.countInStock=req.body.countInStock===undefined?product.countInStock:req.body.countInStock
        product.numReviews=req.body.numReviews===undefined?product.numReviews:req.body.numReviews
        product.description=req.body.description===undefined?product.description:req.body.description

     
      const updatedProduct=await product.save()
       res.status(201).json(updatedProduct)
      }
       else{
           res.status(404)
           throw new Error("Product Nor Found")
       }
      
    } catch (error) {
           console.log("error")
                next(error)
      
    }
}

//create new review
//post/api/produts/:id/reviews
//private 
const  createProductReviews=async (req,res,next)=>{
  
  try {
    const {rating,comment} =req.body
    const product=await Product.findById(req.params.id)

      
      if(product){
       
       const alreadyReviewed=product.reviews.find(r=>r.user.toString()===req.user._id.toString())

     
          if(alreadyReviewed){
            res.status(400)
            throw new Error("you already reviewed this product")
          }
          const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
          }

          product.reviews.push(review)
          product .numReviews=product.reviews.length
          product.rating=product.reviews.reduce((acc,item)=>item.rating +acc,0)/product.reviews.length
          await product.save()
          res.status(201).json({message:"Review added"})
      }
       else{
           res.status(404)
           throw new Error("Product Nor Found")
       }
      
    } catch (error) {
           console.log("error")
                next(error)
      
    }
}
export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReviews
}
