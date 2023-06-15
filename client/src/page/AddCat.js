import axioss from 'axios';
import axios from '../commons/axios';
import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import UseAuth from '../component/UseAuth';


const AddCat = () => {
    const { isLoggedIn, premission, userId, objId, userName, location } = UseAuth();

    const [cat, setCat] = useState({
        name: '',
        breed: '',
        age: '',
        description: '',
        location: location,
        image: '',
        ageUnit: 'Year'
    });

    const [imageSrc, setImageSrc] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [breed, setBreed] = useState('');

    useEffect(() => {
        // Set default location if available
        // const location = ''; // Set the default location here
        if (location) {
            setCat((prevCat) => ({ ...prevCat, location }));
        }
    }, [location]);

    const handleChange = (e) => {
        setCat({ ...cat, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle image upload
        const form = e.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append('file', file);
        }

        formData.append('upload_preset', 'web-api');

        const data = await fetch('https://api.cloudinary.com/v1_1/dhhm4o35a/image/upload', {
            method: 'POST',
            body: formData
        }).then((r) => r.json());

        // Handle data
        cat.age = cat.age + ' ' + cat.ageUnit;
        cat.image = data.url;
        // cat.location = ''; // Set the location value here

        axios
            .post('/add-cat', cat)
            .then((response) => {
                console.log(response.data);
                // Post to social media

                alert('Cat created successfully!'); // Show an alert message

                // create a post to my facebook using graph API 

                formData.append('access_token', response.accessToken);
                axios
                    .post('https://graph.facebook.com/v13.0/me/photos', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((response) => {
                        const photoId = response.data.id;
                        const message = 'Hello, Facebook!';

                        // Proceed to create the post with the uploaded image
                        createPostWithImage(photoId, message);
                    })
                    .catch((error) => {
                        console.error('Error uploading image:', error.response.data);
                    });

                function createPostWithImage(photoId, message) {
                    axios
                        .post(
                            `https://graph.facebook.com/v13.0/me/feed?access_token=${response.accessToken}`,
                            {
                                message: message,
                                attached_media: [{ media_fbid: photoId }],
                            }
                        )
                        .then((response) => {
                            console.log('Post created successfully:', response.data);
                        })
                        .catch((error) => {
                            console.error('Error creating post:', error.response.data);
                        });
                }

                // clean create form data after 3s
                setTimeout(() => {
                    // Clear the form after 3 seconds
                    setCat({
                        name: '',
                        breed: '',
                        age: '',
                        description: '',
                        location: '', // Set the default location here
                        image: '',
                        ageUnit: 'Year'
                    });
                    setImageSrc('');
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };

    const handleOnChange = (changeEvent) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleBreedDetection = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const API_KEY = 'live_TrIi2B4etNkiDY9rWi0ZwPjbnmcymqek1orMpvlXhhCGyCagm1BNTfew7dDiIOmt';

            const uploadResponse = await axioss.post('https://api.thecatapi.com/v1/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-api-key': API_KEY
                }
            });

            const uploadedImageId = uploadResponse.data.id;

            const breedResponse = await axioss.get(`https://api.thecatapi.com/v1/images/${uploadedImageId}/analysis`, {
                headers: {
                    'x-api-key': API_KEY
                }
            });

            if (breedResponse.data) {
                let detectedBreeds = [];

                breedResponse.data.forEach((item) => {
                    if (item.labels && item.labels.length > 0) {
                        item.labels.forEach((label) => {
                            const detectedBreed = {
                                name: label.Name,
                                confidence: label.Confidence,
                            };
                            detectedBreeds.push(detectedBreed);
                        });
                    }
                });

                if (detectedBreeds.length > 0) {
                    setBreed(detectedBreeds);
                } else {
                    setBreed('Breed not found');
                }
            } else {
                setBreed('Breed not found');
            }


        } catch (error) {
            console.error('Error detecting cat breed:', error);
        }
    };

    return (
        <div className="add-cat">
            <Header />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input" type="text" name="name" value={cat.name} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Breed</label>
                                <div className="control">
                                    <input className="input" type="text" name="breed" value={cat.breed} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Age</label>
                                <div className="control dis-flex">
                                    <input className="input" type="number" name="age" value={cat.age} onChange={handleChange} required />
                                    <span className="select">
                                        <select name="ageUnit" value={cat.ageUnit} onChange={handleChange}>
                                            <option value="Year">Year</option>
                                            <option value="Month">Month</option>
                                            <option value="Day">Day</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="field">
                                <label className="label">Description</label>
                                <div className="control">
                                    <input className="input" type="text" name="description" value={cat.description} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Location</label>
                                <div className="control">
                                    <input disabled={true} className="input" type="text" name="location" value={cat.location} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Image URL</label>
                                <p>
                                    <input onChange={handleOnChange} type="file" name="file" />
                                </p>
                                <img src={imageSrc} alt="Uploaded Cat" />
                            </div>
                            <div className="field">
                                <label className="label">Image Upload</label>
                                <div className="control">
                                    <input onChange={handleFileChange} type="file" name="file" />
                                    <button onClick={handleBreedDetection} disabled={!selectedFile}>Detect Breed</button>
                                </div>
                            </div>
                            <div className="field">
                                {/* <label className="label">Breed</label>
                                <div className="control">
                                    {Array.isArray(breed) && breed.length > 0 ? (
                                        breed.map((item, index) => (
                                            <div className='columns' key={index}>
                                                <span className='column'>
                                                    <div className="column">
                                                        {item.name}
                                                    </div>
                                                </span>
                                                <span className='column'> : {item.confidence.toFixed(2)}%</span>
                                            </div>
                                        ))
                                    ) : (
                                        <input className="input" type="text" name="breed" value={breed} disabled />
                                    )}
                                </div> */}

                                <article class="message is-success">
                                    <div class="message-header">
                                        <p>Breed</p>
                                        <button class="delete" aria-label="delete"></button>
                                    </div>
                                    {/* <div className="field">
                                        <label className="label">Breed</label>
                                        <div className="control">
                                            {Array.isArray(breed) && breed.length > 0 ? (
                                                breed.map((item, index) => (
                                                    <div key={index}>
                                                        <span>{item.name}</span>:
                                                        <span>Confidence {item.confidence.toFixed(2)}%</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <input className="input" type="text" name="breed" value={breed} disabled />
                                            )}
                                        </div>
                                    </div> */}
                                    <table className='breed-table'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th className='pd-left20'>Confidence</th>
                                            </tr>
                                        </thead>

                                        <tbody className="control">
                                            {Array.isArray(breed) && breed.length > 0 ? (
                                                breed.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td className='pd-left20'>{item.confidence.toFixed(2)}%</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <div disabled value={breed} className="breed"></div>
                                            )}
                                        </tbody>



                                    </table>
                                </article>
                            </div>

                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCat;
