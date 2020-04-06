import React from 'react';
import { Table } from 'react-bootstrap';

class Report extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            reportData: []
        }
    }
    componentDidMount() {
        fetch("http://localhost:3005/api/getReport")
            .then(res => res.json())
            .then(res => {
                console.log(res.report)
                if (res.success === true) {
                    this.setState({ reportData: res.report })
                }

            })
            .catch(err => console.log(err))
    }
    render() {
        let { reportData } = this.state;
        return (
            <div>
                <div>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Parking Zone</th>
                                <th>Parking Space</th>
                                <th>Booking Date Time</th>
                                <th>Release Date Time</th>
                                <th>Vehicle No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData && reportData.map((v, i) => (
                                <tr key={i}>
                                    <td>{v.parking_zone_id}</td>
                                    <td>{v.parking_space_id}</td>
                                    <td>{v.booking_date_time}</td>
                                    <td>{v.release_date_time || "Not Released"}</td>
                                    <td>{v.vehicle_no}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>


            </div>
        )
    }
}
export default Report;