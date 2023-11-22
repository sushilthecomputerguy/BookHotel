import React  from 'react';
 import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 import Button from 'react-bootstrap/Button';

function HeaderComponent() {
  const navigate = useNavigate();

   const logOut = async () => {
      localStorage.removeItem('jwt')
            localStorage.removeItem('isAuth');
        navigate(`/`, { replace: true })

};
  return (
    <>
         <Navbar  bg="dark"  data-bs-theme="dark"  expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="" id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/admin/posts">POSTS</Nav.Link>
            <Nav.Link href="/admin/category">CATEGORY</Nav.Link>
            <Button onClick={() => logOut()} variant="primary">Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default HeaderComponent;
