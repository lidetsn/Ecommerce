import React,{useState,useEffect} from 'react'
import {Form,Button,Col } from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import FormContainer from "../components/FormContainer"
// import {saveShipingAddress} from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"
import {savePaymentMethhod} from "../actions/cartActions"

const PaymentMethodScreen = ({history}) => {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
                if(!shippingAddress){
                    history.push('/shipping')
                }


        const [paymentMethod,setPaymentMethod]=useState("paypal")
        
    const dispatctch=useDispatch()

      const submitHandler=(e)=>{
          e.preventDefault()
          dispatctch(savePaymentMethhod(paymentMethod))
          history.push("/placeorder")
            
        }
        const userLogin=useSelector(state=>state.userLogin)
        const {userInfo}=userLogin
      
    
        useEffect(()=>{
            if(!userInfo)
            {
                history.push("/login")
            }
           
        },[history,userInfo])
    
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
         <h1>Payment Method</h1>
         <Form onSubmit={submitHandler}>
         <Form.Group>

             <Form.Label as="legend"> Select Method</Form.Label>
        
         <Col>
         <Form.Check
              type="radio" 
              label="payPal or Credit Card" 
              id="payPal" 
              name="paymentMethod" 
              value="payPal" 
              checked
              onChange={(e) =>setPaymentMethod(e.target.value) } >
              </Form.Check>
              <Form.Check
              type="radio" 
              label="Strip" 
              id="Strip" 
              name="paymentMethod" 
              value="Strip" 
              
              onChange={(e) =>setPaymentMethod(e.target.value) } >
              </Form.Check>
         </Col>
         </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
         </Form>
        </FormContainer>
    )
}

export default PaymentMethodScreen