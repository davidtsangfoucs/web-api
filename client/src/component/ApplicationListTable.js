import React, { useState, useEffect } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';

const ApplicationListTable = () => {
    const [applicationData, setApplicationData] = useState([]);

    useEffect(() => {
        fetchApplicationData();
    }, []);

    const fetchApplicationData = async () => {
        try {
            const response = await axios.get(`${baseURL}/get-applicationList`);
            setApplicationData(response.data);
        } catch (error) {
            console.error('Error fetching application data:', error);
        }
    };

    return (
        <div className='container'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>English Name</th>
                        <th>Chinese Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Place of Birth</th>
                        <th>Available Date</th>
                        <th>Time Slot</th>
                        <th>Vaccine Brand</th>
                        <th>Venue</th>
                    </tr>
                </thead>
                <tbody>
                    {applicationData.map((application) => (
                        <tr key={application.id}>
                            <td>{application.applicationId}</td>
                            <td>{application.englishName}</td>
                            <td>{application.chineseName}</td>
                            <td>{application.gender}</td>
                            <td>{application.dob}</td>
                            <td>{application.address}</td>
                            <td>{application.pob}</td>
                            <td>{application.availableDate}</td>
                            <td>{application.timeSlot}</td>
                            <td>{application.vaccineBrand}</td>
                            <td>{application.venue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationListTable;
