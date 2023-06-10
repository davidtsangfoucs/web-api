import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from '../commons/axios';
import Header from '../component/Header';
import UseAuth from '../component/UseAuth';

const AddCat = () => {
    const [cat, setCat] = useState({
        name: '',
        breed: '',
        age: '',
        description: '',
        location: '',
        image: '',
        ageUnit: 'Year'
    });

    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [breed, setBreed] = useState('');

    const { isLoggedIn, premission, userId, objId, location } = UseAuth();


    useEffect(() => {
        if (location) {
            setCat({ location: location })
        }
    }, []);

    // check cat breed using cat API 

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleBreedDetection = async (e) => {

        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const API_KEY = 'live_TrIi2B4etNkiDY9rWi0ZwPjbnmcymqek1orMpvlXhhCGyCagm1BNTfew7dDiIOmt';
            const imageURL = `https://www.thesprucepets.com/thmb/uQnGtOt9VQiML2oG2YzAmPErrHo=/5441x0/filters:no_upscale():strip_icc()/all-about-tabby-cats-552489-hero-a23a9118af8c477b914a0a1570d4f787.jpg`;



            const breedResponse = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids&include_breeds=true&mime_types=jpg,png&limit=1&page=1&order=random&size=small&sub_id=demo-uniq-id&url=${imageURL}`, {
                headers: {
                    'x-api-key': API_KEY,
                },
            });

            if (breedResponse.data) {
                const detectedBreed = breedResponse.data[0].breeds[0].name;
                setBreed(detectedBreed);
            } else {
                setBreed('Breed not found');
            }
        } catch (error) {
            console.error('Error detecting cat breed:', error);
        }
    };
    // end of API call by cat api 


    const handleChange = e => {
        setCat({ ...cat, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        // handle image 
        const form = e.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')
        const formData = new FormData

        for (const file of fileInput.files) {
            formData.append('file', file)
        }

        formData.append('upload_preset', 'web-api')

        const data = await fetch('https://api.cloudinary.com/v1_1/dhhm4o35a/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json());
        console.log('data', data)



        // handle data 
        cat.age = cat.age + " " + cat.ageUnit;
        cat.image = data.url;
        cat.location = location;

        axios.post('/add-cat', cat)
            .then(response => {
                console.log(response.data);
                // post to social media 

                alert('Cat created successfully!'); // Show an alert message
                setTimeout(() => { // Start a timer
                    setCat({ // After 3 seconds, clear the form
                        name: '',
                        breed: '',
                        age: '',
                        description: '',
                        location: { location },
                        image: '',
                        ageUnit: 'Year'
                    });
                    setImageSrc('')
                    window.location.reload();
                }, 3000);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }


    return (

        <div className="add-cat">
            <Header></Header>
            <div className="container">
                <form onSubmit={handleSubmit} >
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

                            <div className="field ">
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
                                    <input disabled={true} className="input" type="text" name="location" value={location} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Image URL</label>
                                <p>
                                    <input onChange={handleOnChange} type="file" name="file" />
                                </p>

                                <img src={imageSrc} />
                            </div>
                            <div className="field">
                                <label className="label">Image URL</label>
                                <div className="control">
                                    <input className="input" type="url" name="image" value={cat.image} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Breed</label>
                                <div className="control">
                                    <input className="input" type="text" name="breed" value={breed} disabled />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button onClick={handleBreedDetection} disabled={!cat.image}>Detect Breed</button>
                                </div>
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
