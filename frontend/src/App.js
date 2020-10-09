import React from 'react';
import {BrowserRouter as Router, Route}  from "react-router-dom"
import {Container} from "react-bootstrap"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import  ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
//import './App.css';

function App() {
  return (
    <Router>
    <Header/>
    <Container>   
       <main className="py-3">
         <Route path='/' component={HomeScreen} exact/>
         <Route path='/login' component={LoginScreen}/>
         <Route path='/register' component={RegisterScreen}/>
         <Route path='/profile' component={ProfileScreen}/>
         <Route path='/product/:id' component={ProductScreen }/>
         <Route path="/cart/:id?" component={CartScreen}/>
        </main>
    </Container>
    
    <Footer/>
    </Router>
  );
}

export default App;
