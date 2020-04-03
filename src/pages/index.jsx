import React from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const LoginForm = ({ validated, signInHandler, inputChangeHandler, user: { u_email, u_password, u_type } }) => {
    return (
        <Form noValidate validated={validated} onSubmit={signInHandler}>
            <h4>Welcome to Parking Management</h4>
            <Form.Group controlId="signinEmail">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="u_email" value={u_email} onChange={inputChangeHandler} required />
            </Form.Group>

            <Form.Group controlId="signinPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control type="password" placeholder="Password" name="u_password" value={u_password} onChange={inputChangeHandler} required />
            </Form.Group>
            <Form.Group controlId="signinUserType">
                <Form.Label>User Type*</Form.Label>
                <Form.Control as="select" value={u_type} name="u_type" onChange={inputChangeHandler} required>
                    <option value="bca">Booking Counter Agent</option>
                    <option value="pza">Parking Zone Assistant</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign In
            </Button>
        </Form>
    );
}
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            userDetail: {
                u_id: 101,
                u_name: '',
                u_email: '',
                u_password: '',
                u_type: 'bca'
            }
        }
    }
    inputChangeHandler(e) {
        let { name, value } = e.currentTarget;
        let { userDetail: userData } = this.state;
        userData[name] = value;
        this.setState({ userDetail: userData })
    }
    signInHandler(e) {

        e.preventDefault();
        const form = e.currentTarget; 
        if (form.checkValidity() === false) {

            e.stopPropagation();
        }

        this.setState({ validated: true });
        let promise = new Promise((resolve, reject) => {
            let user = {
                u_id: 101,
                u_name: 'Dixant Sharma',
                u_email: form.elements.u_email.value,
                u_password: form.elements.u_password.value,
                u_type: form.elements.u_type.value
            }
            setTimeout(() => {
                resolve(user)
            }, 2000);
        });
        promise.then((data) => {
            localStorage.setItem("loggedinUser", JSON.stringify(data));
            window.location.pathname = "/dashboard";
        })
    }
    render() {

        return (
            <div>
                <Container>
                    <Row style={{ margin: 50 }}>
                        <Col></Col>
                        <Col xs="6" md="6"><LoginForm validated={this.state.validated} user={this.state.userDetail} inputChangeHandler={this.inputChangeHandler.bind(this)} signInHandler={this.signInHandler.bind(this)}></LoginForm></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Index;