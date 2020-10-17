import React,{useEffect} from 'react'

import {Table,Button,Row,Col} from "react-bootstrap"
// import {LinkContainer} from "react-router-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import  Message from "../components/Message"
import Loader from "../components/Loader"
import {listAdminOrders} from "../actions/orderAction"



const  OrdersListAdminScreen = ({history}) => {
   
    // const[message,setMessage]=useState(null)

    const  dispatch = useDispatch()

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const orderListAdmin=useSelector(state=>state.orderListAdmin)
    const {loading,error,orders}=orderListAdmin

    
    
    useEffect(()=>{
        if(!userInfo){
            history.push("/login")
        }
       else{
           
               dispatch(listAdminOrders())
         
       }
    },[dispatch,history,userInfo])

    
    return (<Row>
       
        <Col md={12}>
           <h2>List Of Orders</h2>
             {loading?
             <Loader/>:
             error?
             <Message variant="danger">{error}</Message>: orders.length!==0?
             (

            <Table  striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
             <tbody>
                    {orders.map(order=>(
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid?
                         order.paidAt.substring(0,10):(
                        <i className="fas fa-times" style={{color:"red"}} ></i> 
                     )}
                    </td>
                    <td>{order.isDelivered?order.deliveredAt.substring(0,10):(
                       <i className="fas fa-times" style={{color:"red"}} ></i> 
                       )}
                    </td>
                    
                  <td>
                      {/* <LinkContainer to={`/order/${order._id}`}> */}
                      <a href={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="light">Details</Button>
                      </a>
                      {/* </LinkContainer> */}
                  </td>
                </tr>
                    ))}
             </tbody>
            </Table>

           ):<strong >No orders </strong>}

        </Col>
    </Row>
       
    )
}

export default OrdersListAdminScreen