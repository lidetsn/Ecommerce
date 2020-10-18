import React  from 'react'
import {Route} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {LinkContainer} from "react-router-bootstrap"// this does the same aas Link but rap the nave bar
import {Container,Navbar,Nav, NavDropdown} from "react-bootstrap"
import {logout} from '../actions/userActions'
import SearchBox from "./SearchBox"



const Header = ({history}) => {
  console.log(history)
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

                      {/* we use Route to push the history 
                      check the error using <SearchBox> */}
                      {/* <SearchBox/> */}
                    <Route render={({history})=><SearchBox history={history}/>}/>
                    
                    <Nav className="ml-auto">
                    <LinkContainer to="/cart">
                    <Nav.Link  ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>

                    </LinkContainer>
                    {/* <Nav.Link href="/cart" ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link> */}
                     {userInfo?
                           (<NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to="/profile">
                                      <NavDropdown.Item>profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/">
                                    <NavDropdown.Item onClick={logoutHandler}>
                                      Logout
                                    </NavDropdown.Item>
                              </LinkContainer>
                          </NavDropdown>):(
                     <LinkContainer to="/login">
                     <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                     </LinkContainer>
                            )  }
                            {userInfo && userInfo.isAdmin && (
                                   <NavDropdown title="Admin" id="adminmenu">
                                   <LinkContainer to="/admin/userlist">
                                         <NavDropdown.Item>Users</NavDropdown.Item>
                                   </LinkContainer>
                                   <LinkContainer to="/admin/productlist">
                                       <NavDropdown.Item>
                                         Products
                                       </NavDropdown.Item>
                                 </LinkContainer>
                                 <LinkContainer to="/admin/orderlist">
                                       <NavDropdown.Item>
                                         Orders
                                       </NavDropdown.Item>
                                 </LinkContainer>
                             </NavDropdown>

                            )}
                    
                    {/* <Nav.Link href="/login"><i className="fas fa-user"></i>Sign In</Nav.Link> */}
                  </Nav>
    
             </Navbar.Collapse>
          </Container>
      </Navbar>
            
           </header>
    
      
    )
}

export default Header
