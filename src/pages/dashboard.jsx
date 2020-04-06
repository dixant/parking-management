import React from 'react';
import { Jumbotron, Card, CardColumns, Row, Button, Form, Modal } from 'react-bootstrap';
//import parkingSpace from '../model/ParkingSpaceList';
import { Col } from 'react-bootstrap';

const BookingModal = ({ showParkingModal, bookingData: { title, is_available, vehicle_no, zone_id }, bookParkingHandler, closeModal }) => {
    return (
        <Modal show={showParkingModal} centered size="sm" >
            <Modal.Header>
                <Modal.Title>Book a Parking Lot</Modal.Title>
            </Modal.Header>
            <Form onSubmit={bookParkingHandler}>
                <Modal.Body>
                    <p>Parking Zone: {zone_id}</p>
                    <p>Parking Space: {title}</p>
                    <Form.Group controlId="vehicle_no">
                        <Form.Label>Vehicle Registration No.*</Form.Label>
                        <Form.Control type="text" placeholder="Enter Vehicle No." name="v_no" required />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="primary" type="submit">Book</Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previlage: {},
            filterZone: 'All',
            parkingSpaceList: [],
            parkingZoneList: [],
            showParkingModal: false,
            bookingParkingState: {}
        };
    }
    filterZoneHandler(e) {

        let { value } = e.currentTarget;
        this.setState({ filterZone: value });
    }
    bookParking(parking) {
        this.setState({ showParkingModal: true, bookingParkingState: parking });
    }
    releaseParking(parking) {
        console.log("Release", parking)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(parking)
        };
        fetch('http://localhost:3005/api/releaseParking', requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let parkingSpace = this.state.parkingSpaceList;
                let parkings = parkingSpace.map((v, i) => {
                    if (res.data.parking_space_id === v.title) {
                        v.is_available = true;
                        v.vehicle_no = '';
                        v.vehicle_transaction_id = '';
                    }
                    return v;
                })
                this.setState({ parkingSpaceList: parkings, showParkingModal: false })
            })
            .catch(err => { console.log(err) })

    }
    bookParkingHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;

        let parkingDataBody = this.state.bookingParkingState;
        parkingDataBody.vehicle_no = form.elements.v_no.value;
        console.log("parkingDataBody", parkingDataBody)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(parkingDataBody)
        };
        fetch('http://localhost:3005/api/bookParking', requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let parkingSpace = this.state.parkingSpaceList;
                let parkings = parkingSpace.map((v, i) => {
                    if (res.data.parking_space_id === v.title) {
                        v.is_available = false;
                        v.vehicle_no = res.data.vehicle_no;
                    }
                    return v;
                })
                this.setState({ parkingSpaceList: parkings, showParkingModal: false })
            })
            .catch(err => { console.log(err) })
    }
    closeModal(e) {
        this.setState({ showParkingModal: false })
    }
    componentDidMount() {
        let loggedinUser = localStorage.getItem("loggedinUser");
        if (loggedinUser) {
            loggedinUser = JSON.parse(loggedinUser);
        }

        fetch('http://localhost:3005/api/getDashboard')
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    let parkingSpace = res.dashboard;
                    let distinctZone = [...new Set(parkingSpace.map(v => v.zone_id))];
                    this.setState({
                        filterZone: "All",
                        parkingSpaceList: parkingSpace,
                        parkingZoneList: distinctZone,
                        previlage: loggedinUser.previlage
                    });
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        let { filterZone, parkingSpaceList, parkingZoneList, previlage: { canBookParking } } = this.state;
        return (
            <div>
                <Jumbotron>
                    <Row>
                        {/* {canBookParking ? (
                            <Col>

                                <Button className="mlr-10" variant="outline-primary" onClick={this.bookParking.bind(this)}>Book a Parking Space</Button>
                                <Button className="mlr-10" variant="outline-danger" onClick={this.releaseParking.bind(this)}>Release a Parking Space</Button>
                            </Col>)
                            : null} */}
                        <Col>
                            <Form.Control as="select" className="pull-right w-auto mlr-10" value={filterZone} onChange={this.filterZoneHandler.bind(this)} name="filter-zone">
                                <option value="All">All</option>
                                {parkingZoneList && parkingZoneList.map((v, i) => (
                                    <option key={i} value={v}>Zone {v}</option>
                                ))}
                            </Form.Control>
                            <Form.Label className="pull-right w-auto m-7">Filter by Zone: </Form.Label>
                        </Col>
                    </Row>
                    <CardColumns className="parking-space-list">
                        {
                            parkingSpaceList && parkingSpaceList.map((v, i, a) => (
                                filterZone === "All" || v.zone_id === filterZone ? (
                                    <Card key={i} className={`parking-item ${v.is_available ? "available" : "not-available"} ${canBookParking ? "show-cursor" : ""}`} title={canBookParking ? v.is_available ? "Book Parking" : "Release Parking" : v.is_available ? "Available" : "Booked"} onClick={canBookParking ? v.is_available ? this.bookParking.bind(this, v) : this.releaseParking.bind(this, v) : null}>
                                        <Card.Body>
                                            <Card.Text>
                                                {v.title}
                                                {!v.is_available ? ` | ${v.vehicle_no}` : null}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ) : null
                            ))
                        }
                    </CardColumns>
                    <BookingModal showParkingModal={this.state.showParkingModal} bookingData={this.state.bookingParkingState} bookParkingHandler={this.bookParkingHandler.bind(this)} closeModal={this.closeModal.bind(this)}></BookingModal>
                </Jumbotron>

            </div>
        )
    }
}
export default Dashboard;