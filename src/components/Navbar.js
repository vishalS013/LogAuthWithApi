import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.css"
import { useAuth } from './AuthContext';
const NavBar = () => {
  const { logOut, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('login', false)
    logOut()
    navigate('/login')

  }
  return (
    console.log("checj is log", isLoggedIn),
    <div>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container >
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link ><Link to="/products" className='nav-link active '>products</Link></Nav.Link>
            <Nav.Link ><Link to="/home" className='nav-link active '>Home Page</Link></Nav.Link>
            <Nav.Link ><Link to="/contact" className='nav-link active '>contact</Link></Nav.Link>
            <Nav.Link ><Link to="/about" className='nav-link active '>about</Link></Nav.Link>
            {
              isLoggedIn ? (
                <Nav.Link className='nav-link active '>
                  <button onClick={handleLogout}>Logout</button>
                </Nav.Link>) :

                (
                  <Nav.Link >
                    <Link className='nav-link active ' to="/login">Login</Link>
                  </Nav.Link>)}

          </Nav>
        </Container>
      </Navbar>

    </div>
  )
}

export default NavBar