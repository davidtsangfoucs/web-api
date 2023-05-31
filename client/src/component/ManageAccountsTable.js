import { faEye, faEyeSlash, faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';

const ManageAccountsTable = () => {
    const [applicationData, setApplicationData] = useState([]);
    const [showHKID, setShowHKID] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteAccountId, setDeleteAccountId] = useState('');

    useEffect(() => {
        fetchApplicationData();
    }, []);

    const fetchApplicationData = async () => {
        try {
            const response = await axios.get(`${baseURL}/get-employees-accounts`);
            setApplicationData(response.data);
        } catch (error) {
            console.error('Error fetching application data:', error);
        }
    };

    function maskHKID(hkid) {
        if (hkid.length >= 5) {
            const maskedHKID = `${hkid.substring(0, 5)}***`;
            return maskedHKID;
        }
        return hkid;
    }

    const handleUpdate = (accountId, value) => {
        setEditMode(true);
        setEditedData({ accountId, ...value });
    };

    const handleSave = async () => {
        try {
            const { accountId, ...updatedData } = editedData;
            await axios.put(`/update-employees-accounts/${accountId}`, updatedData);
            setEditMode(false);
            setEditedData({});
            fetchApplicationData();
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditedData({});
    };

    const handleDelete = (accountId) => {
        setDeleteConfirmationOpen(true);
        setDeleteAccountId(accountId);
    };

    const confirmDeleteAction = async () => {
        try {
            await axios.delete(`/delete-employees-accounts/${deleteAccountId}`);
            setApplicationData(prevData => prevData.filter(application => application._id !== deleteAccountId));
            setDeleteConfirmationOpen(false);
            setDeleteAccountId('');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const cancelDeleteAction = () => {
        setDeleteConfirmationOpen(false);
        setDeleteAccountId('');
    };

    const handleInputChange = (event, field) => {
        setEditedData((prevData) => ({
            ...prevData,
            [field]: event.target.value,
        }));
    };

    return (
        <div className='container'>
            {isDeleteConfirmationOpen && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="delete-box modal-content">
                        <div className="box has-text-centered">
                            <h2 className='confirm-delete-msg'>Confirm Deletion</h2>
                            <p>Are you sure you want to delete this account?</p>
                            <div className="buttons">
                                <button className="button is-danger" onClick={confirmDeleteAction}>Yes</button>
                                <button className="button" onClick={cancelDeleteAction}>No</button>
                            </div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={cancelDeleteAction}></button>
                </div>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>State</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Employee ID</th>
                        <th>HK ID
                            <button className="icon is-small" onClick={() => setShowHKID(!showHKID)}>
                                <FontAwesomeIcon icon={showHKID ? faEye : faEyeSlash} />
                            </button>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applicationData.map((application) => (
                        <tr key={application._id}>
                            <td>{application.employeeID}</td>
                            <td>
                                {editMode && editedData.accountId === application._id ? (
                                    <input
                                        type="text"
                                        value={editedData.fullName || ''}
                                        onChange={(event) => handleInputChange(event, 'fullName')}
                                    />
                                ) : (
                                    application.fullName
                                )}
                            </td>
                            <td>
                                {editMode && editedData.accountId === application._id ? (
                                    <input
                                        type="email"
                                        value={editedData.email || ''}
                                        onChange={(event) => handleInputChange(event, 'email')}
                                    />
                                ) : (
                                    application.email
                                )}
                            </td>
                            <td>{application.dateOfBirth}</td>
                            <td>{application.gender}</td>
                            <td>
                                {editMode && editedData.accountId === application._id ? (
                                    <input
                                        type="text"
                                        value={editedData.phoneNumber || ''}
                                        onChange={(event) => handleInputChange(event, 'phoneNumber')}
                                    />
                                ) : (
                                    application.phoneNumber
                                )}
                            </td>
                            <td>
                                {editMode && editedData.accountId === application._id ? (
                                    <input
                                        type="text"
                                        value={editedData.address || ''}
                                        onChange={(event) => handleInputChange(event, 'address')}
                                    />
                                ) : (
                                    application.address
                                )}
                            </td>
                            <td>{application.state}</td>
                            <td>{application.position}</td>
                            <td>{application.department}</td>
                            <td>{application.employeeID}</td>
                            <td>
                                {showHKID ? (
                                    application.hkID
                                ) : (
                                    <span>{maskHKID(application.hkID)}</span>
                                )}
                            </td>
                            <td>
                                {editMode && editedData.accountId === application._id ? (
                                    <>
                                        <button className="icon is-small" onClick={handleSave}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                        <button className="icon is-small" onClick={handleCancel}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="icon is-small" onClick={() => handleUpdate(application._id, application)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="icon is-small" onClick={() => handleDelete(application._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageAccountsTable
