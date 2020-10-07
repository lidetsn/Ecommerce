import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {Row,Col,Image,ListGroup,Card,Button} from "react-bootstrap"
import Rating from "../components/Rating"
//import axios from "axios"
import {listProductDetails} from "../actions/productActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

//import products from "../products"

const ProductScreen = ({match}) => {
        // const [product,setProduct]=useState({})
         const dispatch=useDispatch()
         const productDetails=useSelector(state=>state.productDetails)
         const {loading ,error,product}=productDetails

        useEffect(()=>{

            dispatch(listProductDetails(match.params.id))
            // const fetchProduct=async ()=>{
            //         const {data}=await axios.get(`/api/products/${match.params.id}`)
            //             setProduct(data)
            //     }
            //     fetchProduct()
        },[dispatch,match])//add match here to avod warning in running server 
    //   const product=products.find(p=>p._id===match.params.id)

    return (
        <>
        <Link className="btn btn-light my-3" to="/">Go back</Link>
        {loading?(
           <Loader/>
         ):error?(
         <Message variant="danger">{error}</Message>
         ):(
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                          <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating  value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item  >
                        price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description:{product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                price
                                </Col>
                                <Col>
                                 <strong>${product.price}</strong>
                                </Col>                          
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Status
                                </Col>
                                <Col>
                                <strong>{product.countInStock>0? "In stock": "Out of stock"}</strong>
                                </Col>                          
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn-block" type ="Button" disabled={product.countInStock===0}>add To Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
         )}  
        </>
    )
}

export default ProductScreen
