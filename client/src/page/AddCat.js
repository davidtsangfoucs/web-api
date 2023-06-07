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

 
    const handleChange = e => {
        setCat({ ...cat, [e.target.name]: e.target.value });
    };
    const handleSubmit = e => {
        e.preventDefault();

        cat.age = cat.age + " " + cat.ageUnit;

        axios.post('/add-cat', cat)
            .then(response => {
                console.log(response.data);
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
                }, 3000);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };


    return (

        <div className="add-cat">
            <Header></Header>
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
                                <div className="control">
                                    <input className="input" type="text" name="image" value={cat.image} onChange={handleChange} required />
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
