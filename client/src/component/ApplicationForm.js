import React, { useState } from 'react'
import { addDays, format, subDays } from 'date-fns';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
    const navigate = useNavigate(); // Declare this variable

    const [applicationCount, setApplicationCount] = useState(0);
    const [englishName, setEnglishName] = useState('');
    const [chineseName, setChineseName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [pob, setPob] = useState('');
    const [availableDate, setAvailableDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [vaccineBrand, setVaccineBrand] = useState('');
    const [venue, setVenue] = useState('');
    const [error, setError] = useState('');  // For displaying validation error messages

    const englishNameIsValid = (name) => /^[a-zA-Z\s]*$/.test(name);
    const chineseNameIsValid = (name) => /^[\u4e00-\u9fa5]*$/.test(name);
    const dobIsValid = (date) => new Date(date) <= new Date(yesterday);




    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Perform your validation here
    //     // Send form to server
    // };

    const minDate = format(addDays(new Date(), 3), 'yyyy-MM-dd');
    const timeslots = Array.from({ length: 11 }, (_, i) => i + 10).flatMap(hour => [
        `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'} to ${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour < 12 ? 'AM' : 'PM'}`,
        `${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour < 12 ? 'AM' : 'PM'} to ${(hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12}:00 ${(hour + 1) < 12 ? 'AM' : 'PM'}`,
    ]);

    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');

    // // Function to generate the application ID
    // const generateApplicationId = async () => {
    //     const response = await axios.get(`${baseURL}/get-applicationList`);

    //     const applicationList = response.data;
    //     // Get the last application from the list
    //     const lastApplication = applicationList[applicationList.length - 1];
    //     // Extract the applicationId field from the last application
    //     const applicationId = lastApplication.applicationId;

    //     const paddedCount = applicationId + 1

    //     return paddedCount;
    // };

    // 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!englishNameIsValid(englishName)) {
            setError('Invalid English Name: It should contain only alphabets and space.');
            return;
        }

        if (!chineseNameIsValid(chineseName)) {
            setError('Invalid Chinese Name: It should contain only Chinese characters.');
            return;
        }

        if (!dobIsValid(dob)) {
            setError('Invalid Date of Birth: It cannot be a future date.');
            return;
        }

        setError(''); // If all fields are valid, clear the error
        let newId = '';

        try {
            const response = await axios.get(`${baseURL}/get-applicationList`);



            if (response.data && response.data.length > 0) {
                const applicationList = response.data;
                // Get the last application from the list
                const lastApplication = applicationList[applicationList.length - 1];
                // Extract the applicationId field from the last application
                const applicationId = lastApplication.applicationId;
                // Assuming you have the current applicationId as "A0001"

                // Extract the numerical portion of the application ID
                const currentCount = parseInt(applicationId.slice(1)); // Parse the numeric part of the ID

                // Increment the count
                const newCount = currentCount + 1;

                // Pad the count with leading zeros to maintain the desired format
                const paddedCount = String(newCount).padStart(4, '0');

                // Generate the new application ID
                newId = `A${paddedCount}`;
            } else {
                newId = 'A0000';
            }

            // Rest of your code using the newId...
        } catch (error) {
            newId = 'A0000'
            if (error.response && error.response.status === 404) {
                // Handle the case when the application list endpoint returns a 404 status code
                // Set a default value for newId or display an appropriate error message

            } else {
                // Handle other types of errors
                console.error('An error occurred:', error);
                // Optionally, set newId to a default value or handle the error in another way

            }
        }


        try {
            const response = await axios.post(`${baseURL}/create-application`, {
                applicationId: newId,
                englishName,
                chineseName,
                gender,
                dob,
                address,
                pob,
                availableDate,
                timeSlot,
                vaccineBrand,
                venue
            });

            console.log('Application successful:', response.data);
            alert('Application successful!');
            navigate('/');
            // Handle successful registration
        } catch (error) {
            console.error('Application failed:', error.response.data);
            alert('Application failed!');
            // Handle Application failure
        }
    };





    return (
        <div className='application-form'>
            <div className="container">
                {error && <div className="notification is-danger">{error}</div>} {/* Display error */}
                <form onSubmit={handleSubmit}>
                    <div className='columns'>
                        <div className="column">
                            <div className="field">
                                <label className="label">English Name</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="englishName"
                                        value={englishName}
                                        onChange={(e) => setEnglishName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Gender</label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            name="gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Address</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Available Dates</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="date"
                                        min={minDate}
                                        name="availableDate"
                                        value={availableDate}
                                        onChange={(e) => setAvailableDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Venue</label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            name="venue"
                                            value={venue}
                                            onChange={(e) => setVenue(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Venue</option>
                                            <option value="central">中環 - 皇后大道中9號2101室</option>
                                            <option value="kowloonBay">九龍灣 - 海濱匯 - 海濱道77號2樓7號舖</option>
                                            <option value="sheungShui">上水 - 上水廣場 - 龍琛路39號1303A 5號舖</option>
                                        </select>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className="column">
                            <div className="field">
                                <label className="label">Chinese Name</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="chineseName"
                                        value={chineseName}
                                        onChange={(e) => setChineseName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Place of Birth</label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            name="pob"
                                            value={pob}
                                            onChange={(e) => setPob(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Country</option>
                                            <option value="hongkong">Hong Kong</option>
                                            <option value="china">China</option>
                                            <option value="uk">United Kingdom</option>
                                            <option value="us">United States</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Date of Birth</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="date"
                                        name="dob"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>


                            <div className="field">
                                <label className="label">Time Slot</label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            name="timeSlot"
                                            value={timeSlot}
                                            onChange={(e) => setTimeSlot(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Time Slot</option>
                                            {timeslots.map((time) => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Vaccine Brand</label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            name="vaccineBrand"
                                            value={vaccineBrand}
                                            onChange={(e) => setVaccineBrand(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Vaccine Brand</option>
                                            <option value="Sinovac">科興</option>
                                            <option value="Comirnaty">復必泰</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
