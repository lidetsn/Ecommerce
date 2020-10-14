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

export {addOrderItems}