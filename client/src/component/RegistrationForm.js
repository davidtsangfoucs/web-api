import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from '../commons/axios'
import { baseURL } from '../commons/helper'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

// Rest of your code


const RegistrationForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('unVerification');
    const [position, setPosition] = useState('1');
    const [department, setDepartment] = useState('1');
    const [employeeID, setEmployeeID] = useState('');
    const [hkID, sethkID] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isPasswordMatching, setIsPasswordMatching] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(null);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [hasMinLength, setHasMinLength] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the user has agreed to the terms
        if (!agreedToTerms) {
            alert('Please agree to the terms and conditions.');
            return;
        }

        // Set isRegistering to true to show loading state on the button
        setIsRegistering(true);
        try {
            // get exployee data 
            const employee = await getPositionAndDepartment(employeeID);
            if (employee) {
                setPosition(employee.position);
                setDepartment(employee.department);
            }
            // Create an object with all the state fields
            const RegisFormData = {
                fullName,
                email,
                password,
                confirmPassword,
                dateOfBirth: new Date(dateOfBirth),
                gender,
                phoneNumber,
                address,
                state: "verification",
                position: employee.position,
                department: employee.department,
                employeeID,
                hkID,
                agreedToTerms,
                isPrivacyPolicyOpen,
                isRegistering
            };


            // Perform further registration validation and submission

            // call API to create employee
            await registerUser(RegisFormData);

            // Simulating an API call delay with setTimeout


        } catch (error) {
            console.error('Error getting position and department:', error);
            alert("Incorrect Employee ID")
            setIsRegistering(false);
        }



    };

    const registerUser = async (RegisFormData) => {
        try {
            const response = await axios.post(`${baseURL}/create-account`, {
                // Include other registration data as needed
                ...RegisFormData
            });

            console.log('Registration successful:', response.data);
            alert('Registration successful!');
            // Handle successful registration
            setTimeout(() => {
                // Reset form fields and state after successful registration
                setFullName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setDateOfBirth('');
                setGender('');
                setPhoneNumber('');
                setAddress('');
                setState('unVerification');
                setPosition('');
                setDepartment('');
                setEmployeeID('');
                sethkID('');
                setAgreedToTerms(false);

                // Set isRegistering back to false after the registration process is completed
                setIsRegistering(false);


            }, 3000); // 3 seconds delay for demonstration purposes

        } catch (error) {
            console.error('Registration failed:', error.response.data);
            alert('Registration failed!');
            // Handle registration failure
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        setIsPasswordMatching(e.target.value === password);
    };



    const getPositionAndDepartment = async (employeeID) => {
        try {
            console.log('Making API request...'); // Add log here
            const response = await axios.get(`${baseURL}/get-employees/${employeeID}`);

            // Check if the response or response.data is undefined
            if (!response || !response.data) {
                console.error('Response or response data is undefined');
                throw new Error('Error retrieving employee');
            }

            console.log('Response:', response); // Log the response

            if (response.status === 200) {
                const employee = response.data;
                return response.data


                // setPosition(employee.position);
                // setDepartment(employee.department);

            } else {
                throw new Error('Error retrieving employee');
            }
        } catch (error) {
            console.error('Error getting position and department:', error);
            console.error('Error details:', error.response); // Log more error details
            throw error;
        }
    };


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    function checkStringPassword(e) {
        const password = e.target.value;
        const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (strongPasswordPattern.test(password)) {
            // If the password is strong
            setPassword(password);
            setPasswordStrength(true);
            passwordStrengthCheck(e.target.value);
        } else {
            // If the password is not strong
            setPassword(password);
            setPasswordStrength(false);
            passwordStrengthCheck(e.target.value);
        }
    }


    const passwordStrengthCheck = (password) => {
        setHasUppercase(/[A-Z]/.test(password));
        setHasLowercase(/[a-z]/.test(password));
        setHasNumber(/\d/.test(password));
        setHasSpecialChar(/[^a-zA-Z0-9]/.test(password));
        setHasMinLength(password.length >= 8);
    }

    return (

        <form className="registration-form box" onSubmit={handleSubmit}>
            <div>
                <h1>Sign Up</h1>
            </div>
            <div className="columns">
                <div className="field column">
                    <label className="label">Employee ID</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter your employee ID"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field column">
                    <label className="label">HKID</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter your HKID ID"
                            value={hkID}
                            onChange={(e) => sethkID(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className='columns'>
                <div className="field column">
                    <label className="label">Full Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field column">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

            </div>
            <div className='columns'>
                <div className="field column">
                    {/* <label className="label">Password</label> */}
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control" style={{ position: 'relative' }}>
                            <input
                                className="input"
                                style={{ paddingRight: '40px' }}  // Add padding to avoid overlap with the icon
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => checkStringPassword(e)
                                }
                                required
                            />
                            <button
                                onClick={togglePasswordVisibility}
                                className="icon is-small password-with-eye"

                            >
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                            </button>
                        </div>
                        {password && (
                            <div className="notification">
                                <p>Password should include:</p>
                                <ul>
                                    <li className={hasMinLength ? 'has-text-success' : 'has-text-danger'}>
                                        <FontAwesomeIcon icon={hasMinLength ? faCheck : faTimes} />
                                        At least 8 characters
                                    </li>
                                    <li className={hasLowercase ? 'has-text-success' : 'has-text-danger'}>
                                        <FontAwesomeIcon icon={hasLowercase ? faCheck : faTimes} />
                                        At least one lowercase letter
                                    </li>
                                    <li className={hasUppercase ? 'has-text-success' : 'has-text-danger'}>
                                        <FontAwesomeIcon icon={hasUppercase ? faCheck : faTimes} />
                                        At least one uppercase letter
                                    </li>
                                    <li className={hasNumber ? 'has-text-success' : 'has-text-danger'}>
                                        <FontAwesomeIcon icon={hasNumber ? faCheck : faTimes} />
                                        At least one number
                                    </li>
                                    <li className={hasSpecialChar ? 'has-text-success' : 'has-text-danger'}>
                                        <FontAwesomeIcon icon={hasSpecialChar ? faCheck : faTimes} />
                                        At least one special character (e.g., ! @ # $)
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
                <div className="field column">
                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control" style={{ position: 'relative' }}>
                            <input
                                className="input"
                                style={{ paddingRight: '40px' }}  // Add padding to avoid overlap with the icon
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    handleConfirmPasswordChange(e)
                                }}
                                required
                            />
                            <button
                                onClick={togglePasswordVisibility}
                                className="icon is-small password-with-eye"
                            >
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                            </button>
                        </div>
                        {!isPasswordMatching && <p>Passwords do not match</p>}
                    </div>
                </div>
            </div>
            <div className='columns'>
                <div className="field column">
                    <label className="label">Date of Birth</label>
                    <div className="control">
                        <input
                            className="input"
                            type="date"
                            placeholder="Enter your date of birth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field column">
                    <label className="label">Gender</label>
                    <div className="control">
                        <div className="select">
                            <select name="gender" required onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
            <div className="columns">
                <div className="field column">
                    <label className="label">Phone Number</label>
                    <div className="control">
                        <input
                            className="input"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field column">
                    <label className="label">Address</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                            required
                        /> I understand and agree to the{' '}
                        <span className="privacy-policy-link" onClick={() => setIsPrivacyPolicyOpen(true)}>
                            Privacy Policy
                        </span>
                        , terms of service, and acceptable use policy.
                    </label>
                </div>
            </div>

            <Modal
                isOpen={isPrivacyPolicyOpen}
                onRequestClose={() => setIsPrivacyPolicyOpen(false)}
                contentLabel="Privacy Policy"
                className="modal1"
                overlayClassName="modal-overlay"
            >
                <div className="modal-header">
                    <h2>Privacy Policy</h2>
                    <button className="modal-close" onClick={() => setIsPrivacyPolicyOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-content">
                    <p>
                        This is the content of the Privacy Policy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper,
                        neque ac varius venenatis, mauris velit bibendum urna, a malesuada est orci a tellus.
                    </p>
                    <p>Integer efficitur odio id
                        efficitur pharetra. Aliquam at tristique ipsum. Aliquam feugiat ligula et semper tempus. Vivamus consectetur
                        gravida ex non interdum. Donec facilisis sapien vitae lacinia pretium. Nam varius malesuada nisi, vitae fringilla
                        ligula mattis nec. </p>
                    <p>Cras ultrices nisl vel tortor convallis, sit amet egestas dolor vestibulum. Fusce faucibus
                        arcu sem, id faucibus lacus tempus ut. Pellentesque habitant morbi tristique senectus et netus et malesuada
                        fames ac turpis egestas. Integer dapibus tristique sapien, ut efficitur tortor finibus vel. Ut porttitor orci
                        felis, a ultrices nisl finibus nec. Sed sagittis quam eu libero ullamcorper, non dapibus libero fringilla.</p>
                    <p> In aliquam pretium tellus at facilisis. Proin fermentum bibendum lectus eu rhoncus. Suspendisse potenti.</p>
                    {/* Include the rest of the Privacy Policy content here */}
                </div>

            </Modal>
            <div className="field">
                <div className="control">
                    <button
                        type="submit"
                        className={`button is-success ${isRegistering ? 'is-loading' : ''}`}
                        disabled={!agreedToTerms || isRegistering}
                    >
                        {isRegistering ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </div>
        </form>

    );
};

export default RegistrationForm;
