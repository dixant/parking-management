import React from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const LoginForm = ({ validated, signInHandler, inputChangeHandler, user: { u_email, u_password }, loginError, errorMessage }) => {
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

            {loginError ? <div className="error m-10"><span>{errorMessage}</span></div> : null}
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
                u_id: '',
                u_name: '',
                u_email: '',
                u_password: '',
                u_type: ''
            },
            loginError: false,
            errorMessage: ''
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
        if (!form.checkValidity()) {
            e.stopPropagation();
            this.setState({ validated: true });
            return false;
        }



        let { u_password: password, u_email: email } = this.state.userDetail;
        let body = {
            password,
            email
        };
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(body)
        };
        fetch('http://localhost:3005/api/login', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.success) {
                    console.log(" data ", data);
                    localStorage.setItem("loggedinUser", JSON.stringify(data.users));
                    this.setState({ loginError: false, errorMessage: '' });
                    window.location.pathname = "/dashboard";
                } else {
                    this.setState({ loginError: true, errorMessage: data.message });
                }

            })
            .catch(error => console.log('error', error));;


    }
    render() {
        console.log(this.state)
        return (
            <div>
                <Container>
                    <Row style={{ margin: 50 }}>
                        <Col></Col>
                        <Col xs="6" md="6"><LoginForm validated={this.state.validated} user={this.state.userDetail} loginError={this.state.loginError} errorMessage={this.state.errorMessage} inputChangeHandler={this.inputChangeHandler.bind(this)} signInHandler={this.signInHandler.bind(this)}></LoginForm></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Index;