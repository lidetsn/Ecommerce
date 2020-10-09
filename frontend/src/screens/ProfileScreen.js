import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form,Button,Row,Col,Container } from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import  Message from "../components/Message"
import Loader from "../components/Loader"
import {getUserDetails,updateUserProfile} from "../actions/userActions"


const ProfileScreen = ({location,history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[confirmpassword,setConfirmPassword]=useState("")
    const[message,setMessage]=useState(null)




    const  dispatch = useDispatch()

    const userDetail=useSelector(state=>state.userDetail)
    const {loading,error,user}=userDetail

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile
    
    useEffect(()=>{
        if(!userInfo){
            history.push("/login")
        }
       else{
           if(!user.name){
               dispatch(getUserDetails("profile"))
           }
           else{
               setName(user.name)
               setEmail(user.email)
           }

       }
    },[dispatch,history,userInfo,name])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmpassword){
            setMessage("password do not match")
        }
        else{
            //dispatch update profile
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
        
    }
    return (<Row>
        <Col md={3}>
        <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">PROFILE UPDATED</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
            <Form.Group  controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="name"
                    placeholder="Enter name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group  controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email"
                    placeholder="Enter email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group  controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    placeholder="Enter Password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group  controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="ConfermPassword"
                    placeholder="Confirm Password" 
                    value={password}
                    onChange={(e)=>setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
        <Button type="submit" variant="primary">Update</Button>

            </Form>
        </Col>
        <Col md={9}>
           <h2>My Orders</h2>
        </Col>
    </Row>
       
    )
}

export default ProfileScreen