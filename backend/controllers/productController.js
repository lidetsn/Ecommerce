import Product  from "../models/productModel.js"

const getProducts=async (req,res,next)=>{
    try {
        const products=await Product.find({})     
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

export {
    getProducts,
    getProductById
}
