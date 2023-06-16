import { faEye, faEyeSlash, faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import UseAuth from './UseAuth';

const ManageCatsTable = () => {
    const [catData, setCatData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteCatId, setDeleteCatId] = useState('');
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState([]);

    const { isLoggedIn, premission, userId, objId } = UseAuth();


    useEffect(() => {
        if (userId) {
            fetchCatData(userId);
        }
    }, [userId]);

    const fetchCatData = async (userId) => {
        try {
            const favCatsResponse = await axios.get(`${baseURL}/get-fav-cats/${userId}`);
            const favCatIds = favCatsResponse.data.clickedCards;

            const catsResponse = await axios.get(`${baseURL}/get-cats`);
            const filteredCats = catsResponse.data.filter((cat) => favCatIds.includes(cat._id));

            setCatData(filteredCats);
        } catch (error) {
            console.error('Error fetching cat data:', error);
        }
    };




    const handleCancel = () => {
        setEditMode(false);
        setEditedData({});
    };

    const handleDelete = (catId) => {
        setDeleteConfirmationOpen(true);
        setDeleteCatId(catId);
    };

    const confirmDeleteAction = async () => {

        try {
            // await axios.delete(`/delete-cats/${deleteCatId}`);
            await axios.delete(`/delete-fav-cats/${userId}/${deleteCatId}`);
            setCatData((prevData) => prevData.filter((cat) => cat._id !== deleteCatId));
            setDeleteConfirmationOpen(false);
            setDeleteCatId('');
        } catch (error) {
            console.error('Error deleting cat:', error);
        }
    };



    const cancelDeleteAction = () => {
        setDeleteConfirmationOpen(false);
        setDeleteCatId('');
    };

    const handleInputChange = (event, field) => {
        setEditedData((prevData) => ({
            ...prevData,
            [field]: event.target.value,
        }));
    };

    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData([]);
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    return (
        <div className="container">
            {isDeleteConfirmationOpen && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="delete-box modal-content">
                        <div className="box has-text-centered">
                            <h2 className="confirm-delete-msg">Confirm Deletion</h2>
                            <p>Are you sure you want to delete this cat?</p>
                            <div className="buttons">
                                <button className="button is-danger" onClick={confirmDeleteAction}>
                                    Yes
                                </button>
                                <button className="button" onClick={cancelDeleteAction}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={cancelDeleteAction}></button>
                </div>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Age</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Image URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {catData.map((cat) => (
                        <tr key={cat._id}>
                            <td>
                                {editMode && editedData.catId === cat._id ? (
                                    <input
                                        type="text"
                                        value={editedData.name || ''}
                                        onChange={(event) => handleInputChange(event, 'name')}
                                    />
                                ) : (
                                    cat.name
                                )}
                            </td>
                            <td>
                                {editMode && editedData.catId === cat._id ? (
                                    <input
                                        type="text"
                                        value={editedData.breed || ''}
                                        onChange={(event) => handleInputChange(event, 'breed')}
                                    />
                                ) : (
                                    cat.breed
                                )}
                            </td>
                            <td>
                                {editMode && editedData.catId === cat._id ? (
                                    <input
                                        type="number"
                                        value={editedData.age || ''}
                                        onChange={(event) => handleInputChange(event, 'age')}
                                    />
                                ) : (
                                    cat.age
                                )}
                            </td>
                            <td>
                                {editMode && editedData.catId === cat._id ? (
                                    <textarea
                                        value={editedData.description || ''}
                                        onChange={(event) => handleInputChange(event, 'description')}
                                    />
                                ) : (
                                    cat.description
                                )}
                            </td>
                            <td>
                                {editMode && editedData.catId === cat._id ? (
                                    <input
                                        type="text"
                                        value={editedData.location || ''}
                                        onChange={(event) => handleInputChange(event, 'location')}
                                    />
                                ) : (
                                    cat.location
                                )}
                            </td>
                            <td>
                                {editMode && editedData.catId === cat._id ? (
                                    <div className="">
                                        <input
                                            type="text"
                                            value={editedData.image || ''}
                                            onChange={(event) => handleInputChange(event, 'image')}
                                        />
                                        <p>
                                            <input onChange={handleOnChange} type="file" name="file" />
                                        </p>
                                        <img src={imageSrc} alt={editedData.name} />
                                    </div>
                                ) : (
                                    <div className="img-size-200px">
                                        <img src={cat.image} alt={editedData.name} />
                                    </div>
                                )}
                            </td>
                            <td>
                                {editMode && editedData.catId === cat._id ? (
                                    <>

                                        <button className="icon is-small" onClick={handleCancel}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </>
                                ) : (
                                    <>

                                        <button className="icon is-small" onClick={() => handleDelete(cat._id)}>
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

export default ManageCatsTable;
