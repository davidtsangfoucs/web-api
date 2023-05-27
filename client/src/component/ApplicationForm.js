import React, { useState } from 'react'
import { addDays, format, subDays } from 'date-fns';

const ApplicationForm = () => {

    const [form, setForm] = useState({
        englishName: '',
        chineseName: '',
        gender: '',
        dob: '',
        address: '',
        pob: '',
        vaccineBrand: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform your validation here
        // Send form to server
    };

    const minDate = format(addDays(new Date(), 3), 'yyyy-MM-dd');
    const timeslots = Array.from({ length: 11 }, (_, i) => i + 10).flatMap(hour => [
        `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'} to ${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour < 12 ? 'AM' : 'PM'}`,
        `${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour < 12 ? 'AM' : 'PM'} to ${(hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12}:00 ${(hour + 1) < 12 ? 'AM' : 'PM'}`,
    ]);

    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');



    return (
        <div className='application-form'>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">English Name</label>
                        <div className="control">
                            <input className="input" type="text" name="englishName" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Chinese Name</label>
                        <div className="control">
                            <input className="input" type="text" name="chineseName" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Gender</label>
                        <div className="control">
                            <div className="select">
                                <select name="gender" onChange={handleChange} required>
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Date of Birth</label>
                        <div className="control">
                            <input className="input" type="date" name="dob" max={yesterday} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Address</label>
                        <div className="control">
                            <input className="input" type="text" name="address" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Place of Birth</label>
                        <div className="control">
                            <div className="select">
                                <select name="pob" onChange={handleChange} required>
                                    <option value="">Select Country</option>
                                    <option value="hongkong">Hong Kong</option>
                                    <option value="china">China</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="us">United States</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    {/* keep  */}
                    <div className="field">
                        <label className="label">Available Dates</label>
                        <div className="control">
                            <input className="input" type="date" min={minDate} name="availableDates" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Time Slot</label>
                        <div className="control">
                            <div className="select">
                                <select name="timeSlot" onChange={handleChange} required>
                                    <option value="">Select Time Slot</option>
                                    {timeslots.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Venue</label>
                        <div className="control">
                            <div className="select">
                                <select name="venue" onChange={handleChange} required>
                                    <option value="">Select Venue</option>
                                    <option value="community_center">社區疫苗接種中心</option>
                                    <option value="private_clinic">私家診所新冠疫苗接種站</option>
                                    <option value="children_center">兒童社區疫苗接種中心</option>
                                    <option value="public_clinic">醫管局轄下的指定普通科門診診所</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* subit button */}
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-link">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ApplicationForm
