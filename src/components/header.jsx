import React from 'react';
import { Navbar, NavLink, NavDropdown, FormControl, Button, Form, Nav } from 'react-bootstrap';

const Header = ()=> {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Parking Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto">
                    <NavLink href="/initialize">Initialize</NavLink>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                    <NavLink href="/report">Reports</NavLink>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Header;