import React from 'react'
import {LinkContainer} from "react-router-bootstrap"// this does the same aas Link but rap the nave bar
import {Container,Navbar,Nav} from "react-bootstrap"


const Header = () => {
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
                    <LinkContainer to="/login">
                    <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                    </LinkContainer>
                    {/* <Nav.Link href="/login"><i className="fas fa-user"></i>Sign In</Nav.Link> */}
                  </Nav>
    
             </Navbar.Collapse>
          </Container>
      </Navbar>
            
           </header>
    
      
    )
}

export default Header
