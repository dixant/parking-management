import React from 'react';
import { Jumbotron, NavLink } from "react-bootstrap"
import { Button } from 'react-bootstrap';


function NotFound() {

    return (
        <div className="not-found">
            <Jumbotron>
                <div>
                    <center>
                        <h1>404</h1>
                        <h2>Oh No! Page not found</h2>

                        <NavLink href="/dashboard"><Button>Return to HomePage</Button></NavLink>
                    </center>
                </div>

            </Jumbotron>
        </div>
    );
}

export default NotFound;