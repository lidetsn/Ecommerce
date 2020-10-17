import Order  from "../models/orderModel.js"



//
const addOrderItems=async (req,res,next)=>{
    try {
        const {
            orderItems,
            
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice

        }=req.body
        if(orderItems && orderItems.length===0){
            throw new Error("No order items")
        }
        else{
            const order=new Order({
                orderItems,
                user:req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })
            const createdOrder=await order.save()
            res.status(201).json(createdOrder)
        }
             
      } catch (error) {
         console.log(error.message)
         next(error)
        //  res.status(401).json(error) 
      }
}

const getOrderById=async (req,res,next)=>{
    try {
        // console.log(req.params.id)
        const order=await Order.findById(req.params.id).populate("user","name email")
      if(order){
          res.json(order)
      }
      else{
          res.status(404)
          throw new Error("Order Not found")
      }
             
      } catch (error) {
         console.log(error.message)
         next(error)
        //  res.status(401).json(error) 
      }
}
//update order to paid

const updateOrderToPaid=async (req,res,next)=>{
    try {
        // console.log(req.params.id)
        const order=await Order.findById(req.params.id)
      if(order){
          order.isPaid=true
          order.paidAt=Date.now()
          order.paymentResult={
              id:req.body.id,
              status:req.body.status,
              update_time:req.body.update_time,
              email_address:req.body.payer.email_address
          }
          const updatedOrder=await order.save()
          res.json(updatedOrder)
      }
      else{
          res.status(404)
          throw new Error("Order Not found")
      }
             
      } catch (error) {
         console.log(error.message)
         next(error)
        //  res.status(401).json(error) 
      }
}

//update order to paid
//get/api/orders/:id/deliver
//private/admin
const updateOrderToDelivered=async (req,res,next)=>{
    try {
        // console.log(req.params.id)
        const order=await Order.findById(req.params.id)
      if(order){
          order.isDelivered=true
          order.deliveredAt=Date.now()
          
          const updatedOrder=await order.save()
          res.json(updatedOrder)
      }
      else{
          res.status(404)
          throw new Error("Order Not found")
      }
             
      } catch (error) {
         console.log(error.message)
         next(error)
        //  res.status(401).json(error) 
      }
}
//get logged in user order
const getMyOrders=async (req,res,next)=>{
    try {
        // console.log(req.params.id)
        const orders=await Order.find({user:req.user._id})
      
          res.json(orders)
      
     
             
      } catch (error) {
         console.log(error.message)
         next(error)
        //  res.status(401).json(error) 
      }

    }


const getOrders=async (req,res,next)=>{
    try {
        
        const order=await Order.find({}).populate("user","id name")
      if(order){
          res.json(order)
      }
      else{
          res.status(404)
      }
             
      } catch (error) {
         console.log(error.message)
         next(error)
        //  res.status(401).json(error) 
      }
}

export {addOrderItems,
        getOrderById,
        updateOrderToPaid,
        getMyOrders,
        getOrders,
        updateOrderToDelivered}