import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from '../commons/axios'
import { baseURL } from '../commons/helper'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

// Rest of your code


const RegistrationForm = () => {
    const [fullName, setFullName] = useState('');
    const [nameError, setNameError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('unVerification');
    const [premission, setPremission] = useState('1');
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
    const [hkIdError, setHkIdError] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [role, setRole] = useState('public');

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
            if (role !== "public") {
                // get exployee data 
                const employee = await getPremissionAndDepartment(employeeID);
                if (employee) {
                    setPremission(employee.premission);
                    setDepartment(employee.department);
                }
                // Create an object with all the state fields

                let emId = 'A000'
                // Extract the numerical portion of the application ID
                const currentCount = parseInt(emId.slice(1)); // Parse the numeric part of the ID

                // Increment the count
                const newCount = currentCount + 1;

                // Pad the count with leading zeros to maintain the desired format
                const paddedCount = String(newCount).padStart(4, '0');

                // Generate the new application ID
                const newId = `A${paddedCount}`;

                const RegisFormData = {
                    fullName,
                    email,
                    password,
                    confirmPassword,
                    dateOfBirth: new Date(dateOfBirth).toISOString().substring(0, 10),
                    gender,
                    phoneNumber,
                    address,
                    state: "verification",
                    premission: employee.premission,
                    department: employee.department,
                    employeeID: newId,
                    hkID,
                    agreedToTerms,
                    isPrivacyPolicyOpen,
                    isRegistering
                };


                // Perform further registration validation and submission

                // call API to create employee
                await registerUser(RegisFormData);

                // Simulating an API call delay with setTimeout

            } else {

                setPremission("Public User");
                setDepartment("No Department");
                let emId = 'A000'
                // Extract the numerical portion of the application ID
                const currentCount = parseInt(emId.slice(1)); // Parse the numeric part of the ID

                // Increment the count
                const newCount = currentCount + 1;

                // Pad the count with leading zeros to maintain the desired format
                const paddedCount = String(newCount).padStart(4, '0');

                // Generate the new application ID
                const newId = `A${paddedCount}`;

                const RegisFormData = {
                    fullName,
                    email,
                    password,
                    confirmPassword,
                    dateOfBirth: new Date(dateOfBirth).toISOString().substring(0, 10),
                    gender,
                    phoneNumber,
                    address,
                    state: "verification",
                    premission: "Public User",
                    department: "No Department",
                    employeeID: newId,
                    hkID,
                    agreedToTerms,
                    isPrivacyPolicyOpen,
                    isRegistering
                };


                // Perform further registration validation and submission

                // call API to create employee
                await registerUser(RegisFormData);

                // Simulating an API call delay with setTimeout

            }


        } catch (error) {
            console.error('Error getting premission and department:', error);
            alert("Incorrect Sign Up Code")
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
                setPremission('');
                setDepartment('');
                setEmployeeID('');
                sethkID('');
                setAgreedToTerms(false);

                // Set isRegistering back to false after the registration process is completed
                setIsRegistering(false);


            }, 3000); // 3 seconds delay for demonstration purposes
            setAgreedToTerms(false);

            // Set isRegistering back to false after the registration process is completed
            setIsRegistering(false);


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



    const getPremissionAndDepartment = async (employeeID) => {
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


                // setPremission(employee.premission);
                // setDepartment(employee.department);

            } else {
                throw new Error('Error retrieving employee');
            }
        } catch (error) {
            console.error('Error getting premission and department:', error);
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


    const isHKID = (hkid) => {
        const hkidPat = /^[A-Z]{1,2}[0-9]{6}([0-9A])$/;
        let strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        // clean up the input string and convert to uppercase
        hkid = hkid.toUpperCase().trim();

        // check the pattern and the check digit
        if (hkid.search(hkidPat) == -1) {
            return false;
        } else {
            let hkidSub = hkid.substring(0, hkid.length - 1);
            let intCheckDigit = hkid.substring(hkid.length - 1);

            // calculate the check digit
            let weight = 0;
            let strHKID = hkidSub;
            let startPos = 0;

            // if hkid starts with two english letters
            if (hkidSub.length == 8) {
                strHKID = ' ' + hkidSub;
                startPos = 1;
            }

            for (let i = startPos; i < 9; i++) {
                let char = strHKID.substring(i, i + 1);
                if (char <= '9' && char >= '0') { // numeric part
                    weight += parseInt(char) * (9 - i);
                } else { // English character part
                    weight += (10 + strValidChars.indexOf(char)) * (9 - i);
                }
            }

            let checkDigit = 11 - (weight % 11);

            if (checkDigit == 11) {
                checkDigit = '0';
            } else if (checkDigit == 10) {
                checkDigit = 'A';
            }

            // verify the check digit
            if (checkDigit != intCheckDigit) {
                return false;
            }
        }

        return true;
    }

    // use it in the onChange event
    const handleChangeHKID = (e) => {
        const newHKID = e.target.value;
        sethkID(newHKID);
        if (isHKID(newHKID)) {
            // HKID is valid
            setHkIdError(''); // Clear any error message
        } else {
            setHkIdError('HKID is not valid');
        }
    }

    const isNameValid = (name) => {
        const nameRegEx = /^[a-zA-Z\s]*$/; // Allows letters and whitespace only
        if (!name) {
            return "Full name is required.";
        }
        else if (!nameRegEx.test(name)) {
            return "Full name can only contain letters and spaces.";
        }
        else if (name.length > 50) {
            return "Full name can't exceed 50 characters.";
        }
        else if (name.split(" ").length < 2) {
            return "Please enter both first and last name.";
        }
        return null; // Name is valid
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setFullName(name);
        setNameError(isNameValid(name));
    };

    const isEmailValid = (email) => {
        const emailRegEx = /\S+@\S+\.\S+/; // Basic check for format "something@something.something"
        if (!email) {
            return "Email is required.";
        }
        else if (!emailRegEx.test(email)) {
            return "Email is invalid.";
        }
        return null; // Email is valid
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        setEmailError(isEmailValid(email));
    };

    // Get today's date
    let today = new Date();
    // Subtract 18 years
    today.setFullYear(today.getFullYear() - 18);
    // Convert the date to a string in the yyyy-mm-dd format
    let initialDate = today.toISOString().split("T")[0];
    // Set the initial value
    // useEffect(() => {
    //     setDateOfBirth(initialDate);
    // }, []);

    // Define the check
    const isHKPhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^[0-9]{8}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    // State for validity
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

    // Update handler
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        setIsPhoneNumberValid(isHKPhoneNumber(e.target.value));
    };



    return (

        <form className="registration-form box" onSubmit={handleSubmit}>
            <div>
                {/* <h1>Sign Up</h1> */}
            </div>
            {/* <div className="columns"> */}
            {/* <div className="field column">
                    <label className="label">Sign Up Code</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter your Sign Up Code"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            required
                        />
                    </div>
                </div> */}
            <div className="columns">
                <div className="field column">
                    <label className="label">Role</label>
                    <div className="control">
                        <select
                            className="input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="public">Public User</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>
                </div>
                {role === 'staff' && (
                    <div className="field column">
                        <label className="label">Sign Up Code</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter your Sign Up Code"
                                value={employeeID}
                                onChange={(e) => setEmployeeID(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}
                <div className="field column">
                    <label className="label">HKID</label>
                    <div className="control">
                        <input
                            className={`input ${hkIdError ? 'is-danger' : ''}`}
                            type="text"
                            placeholder="Enter your HKID ID"
                            value={hkID}
                            onChange={(e) => { handleChangeHKID(e) }}
                            required
                        />
                        {hkIdError && <p className="help is-danger">{hkIdError}</p>}
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
                            onChange={(e) => handleNameChange(e)}
                            required
                        />
                        {nameError && <p>{nameError}</p>}
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
                            onChange={(e) => handleEmailChange(e)}
                            required
                        />
                        {emailError && <p>{emailError}</p>}
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
                            <a
                                onClick={togglePasswordVisibility}
                                className="icon is-small password-with-eye"
                            >
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                            </a>
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
                            // Min is 18 years ago, max is today
                            max={initialDate}
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
                            className={`input ${isPhoneNumberValid ? "" : "is-danger"}`}
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(e)}
                            required
                        />
                        {!isPhoneNumberValid && <p className="help is-danger">Invalid phone number</p>}
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
                <div className="modal-content" style={{ fontFamily: 'Arial', color: '#333', padding: '20px', lineHeight: '1.5' }}>
                    {/* <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Privacy Policy</h1> */}
                    <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>Collection of Personal Information</h2>
                    <p>The System will collect and store only necessary personal information for account creation and management, including but not limited to, names, contact details, and role-related information. This information will only be used for purposes directly related to managing the vaccination booking process and performing job duties.</p>

                    <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>Use of Personal Information</h2>
                    <p>Personal information collected during account creation will be used solely for the purpose of user identification, system access, task assignment, audit trail creation, and to ensure secure communication within the System. Under no circumstances will personal information be shared with third parties outside the Department. </p>

                    <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>Access Control</h2>
                    <p>Access to personal information within the System will be strictly controlled based on user roles. System Administrators will have broader access compared to Medical Staff. Users will only have access to personal information that is necessary for them to perform their specific job duties.</p>

                    <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>Responsibility and Compliance

                    </h2>
                    <p> System Administrators are responsible for ensuring compliance with this Privacy Policy. Any misuse or breach of this policy may lead to disciplinary action, up to and including termination of employment and <strong>legal action</strong>.

                        By using the System, all Users agree to abide by this Privacy Policy. Users should ensure they understand their responsibilities under this policy and seek clarification from the Department's IT Manager or Data Protection Officer if necessary.

                    </p>

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
