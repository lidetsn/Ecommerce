import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import {LinkContainer} from "react-router-bootstrap"// this does the same aas Link but rap the nave bar
import {Container,Navbar,Nav, NavDropdown} from "react-bootstrap"
import {logout} from '../actions/userActions'


const Header = () => {
  const dispatch=useDispatch()
  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  const logoutHandler=()=>{
    dispatch(logout())
  }
    return (
      
              <header>
              <Navbar bg="dark"  variant="dark" expand="lg" collapseOnSelect>
              <Container>
                  <LinkContainer to="/">
                    <Navbar.Brand>GELINA Shop</Navbar.Brand></LinkContainer>
                    {/* <Navbar.Brand href="/">GELINA Shop</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <LinkContainer to="/cart">
                    <Nav.Link  ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>

                    </LinkContainer>
                    {/* <Nav.Link href="/cart" ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link> */}
                     {userInfo?(<NavDropdown title={userInfo.name} id="username">
                       <LinkContainer to="/profile">
                         <NavDropdown.Item>profile</NavDropdown.Item>
                       </LinkContainer>
                       <NavDropdown.Item onClick={logoutHandler}>
                         Logout
                       </NavDropdown.Item>
                     </NavDropdown>):
                     <LinkContainer to="/login">
                     <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                     </LinkContainer>
                     }
                    
                    {/* <Nav.Link href="/login"><i className="fas fa-user"></i>Sign In</Nav.Link> */}
                  </Nav>
    
             </Navbar.Collapse>
          </Container>
      </Navbar>
            
           </header>
    
      
    )
}

export default Header
