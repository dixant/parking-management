import React from 'react';
import { Navbar, NavLink, Button, Nav, Form } from 'react-bootstrap';

function signoutFunction() {
    console.log("Sign out");
    localStorage.removeItem("loggedinUser");
    window.location.pathname = "/";
}
const Header = () => {
    let loggedinUser = localStorage.getItem("loggedinUser");
    let canInitialize = false;
    let canBookParking = false;
    let canSeeReports = false;
    let role = '';

    if (loggedinUser) {
        loggedinUser = JSON.parse(loggedinUser);
        canInitialize = loggedinUser.previlage.canInitialize;
        canBookParking = loggedinUser.previlage.canBookParking;
        canSeeReports = loggedinUser.previlage.canSeeReports;
        role = loggedinUser.u_type;
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/dashboard">Parking Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto">
                    {loggedinUser !== null ? <NavLink href="/dashboard">Dashboard</NavLink> : null}
                    {canInitialize ? <NavLink href="/initialize">Initialize</NavLink> : null}
                    {canSeeReports ? <NavLink href="/report">Reports</NavLink> : null}
                </Nav>
                <span className="mlr-10">{role === '' ? "" : role === "agent" ? "Booking Counter Agent" : "Parking Zone Assistant"}</span>
                <Button variant="outline-success" onClick={signoutFunction.bind()}>Sign Out</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Header;