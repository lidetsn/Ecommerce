import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Row,Col} from "react-bootstrap"
// import products from "../products"
import Product from "../components/Product"
// import axios from "axios"
import {listProducts } from "../actions/productActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

const HomeScreen = ({match}) => {
    const keyword=match.params.keyword
    // const [products,setProducts]=useState([])
    const dispatch = useDispatch()
    const productList=useSelector(state=>state.productList)
    // console.log(productList)
    const {loading,error,products}=productList
    useEffect(()=>{
       // dispatch(listProducts())
             //change after search added.....change reflect in product action too
           dispatch(listProducts(keyword))
        //  const fetchProducts=async()=>{
        //         const {data}=await axios.get("api/products")
        //             setProducts(data)
        //     }
        //     fetchProducts()
    },[dispatch,keyword])
    return (
        <>
        <h1>Latest Products</h1>
         {loading?(
           <Loader/>
         ):error?(
         <Message variant="danger">{error}</Message>
         ):(
        <Row>{products.map((product)=>(
               <Col key={product._id} sm={12} md={6 } lg={4} xl={3}>
                       <Product product={product}></Product>               
                 </Col>
        ))}
        </Row>
         )}
        </>
    )
}

export default HomeScreen
