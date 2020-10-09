import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form,Button,Row,Col,Container } from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import  Message from "../components/Message"
import Loader from "../components/Loader"
import {register} from "../actions/userActions"
import FormContainer from "../components/FormContainer"

const RegisterScreen = ({location,history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[confirmpassword,setConfirmPassword]=useState("")
    const[message,setMessage]=useState(null)




    const  dispatch = useDispatch()
    const userRegister=useSelector(state=>state.userRegister)
    const {loading,error,userInfo}=userRegister
    const redirect=location.search?location.search.split("=")[1]:"/"
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }

    },[history,userInfo,redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmpassword){
            setMessage("password do not match")
        }
        else{
            dispatch(register(name,email,password))
        }
        
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
            <Form.Group  controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="name"
                    placeholder="Enter name" 
                    value={email}
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
        <Button type="submit" variant="primary">Register</Button>

            </Form>
            <Row  className="py-3">
                <Col>
                Have Account?
                <Link to={redirect?`/login?redirect=${redirect}`:"/register"}>
                    
                Login</Link>
               </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen