import React, { useState } from 'react';
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
                        location: '',
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
                                    <input className="input" type="text" name="location" value={cat.location} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Image URL</label>
                                {/* <div className="control">
                                    <input className="input" type="text" name="image" value={cat.image} onChange={handleChange} required />
                                </div> */}
                                <p>
                                    <input onChange={handleOnChange} type="file" name="file" />
                                </p>

                                <img src={imageSrc} />
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
