import React, { useState } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { GApiProvider } from 'react-gapi-auth2';
import GoogleLogin from './GoogleLogin';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [fbCount, setFbCount] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const responseFacebook = async (response) => {

        try {
            let RegisFormData = {};
            let res = await axios.get(`https://graph.facebook.com/me?fields=name,email,picture,gender,birthday,location&access_token=${response.accessToken}`);

            console.log('res', res)

            let responseCheckUser;
            try {
                responseCheckUser = await axios.get(`${baseURL}/get-employees-accounts/${res.data.id}`);
            } catch (error) {
                console.log('User not found:', error.message);
                // Handle the case when the user is not found
                // Set default values or take alternative actions
            }

            // Check if the response or response.data is undefined or the user does not exist
            if (!responseCheckUser || !responseCheckUser.data) {
                RegisFormData = {
                    fullName: res.data.name,
                    email: res.data.email,
                    password: 'No password number',
                    confirmPassword: 'No password number',
                    dateOfBirth: res.data.birthday,
                    gender: res.data.gender,
                    phoneNumber: 'No phone number',
                    address: 'No address number',
                    state: "verification",
                    premission: "Public User",
                    department: "No Department",
                    employeeID: res.data.id,
                    hkID: 'No phone number',
                };

                // first time use facebook 
                // give register acc
                let registrationResponse = await registerUser(RegisFormData);

                // Set the JWT to localStorage
                localStorage.setItem('auth-token', registrationResponse.data.token);
                localStorage.setItem('premission', "Public User");
                localStorage.setItem('user-id', registrationResponse.data.employeeID);
                localStorage.setItem('obj-id', registrationResponse.data._id);
                localStorage.setItem('user-name', registrationResponse.fullName);
                localStorage.setItem('location', registrationResponse.location);
                const logoutTime = Date.now() + 60 * 60 * 1000; // 60 minutes
                localStorage.setItem('logoutTime', logoutTime.toString());
                navigate('/')
                window.location.reload();
            } else {
                // have facebook acc already 
                // give login state 
                let UserData = responseCheckUser.data;
                console.log("UserData", UserData)

                // Since user already exists, the JWT should be in the response
                // Set the JWT to localStorage
                localStorage.setItem('auth-token', UserData.token);
                localStorage.setItem('premission', UserData.employee.premission);
                localStorage.setItem('user-id', UserData.employee.employeeID);
                localStorage.setItem('obj-id', UserData.employee._id);
                localStorage.setItem('user-name', UserData.employee.fullName);
                localStorage.setItem('location', UserData.employee.location);
                const logoutTime = Date.now() + 60 * 60 * 1000; // 60 minutes
                localStorage.setItem('logoutTime', logoutTime.toString());
                alert('Login successfully');
                navigate('/')
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
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

            // Set isRegistering back to false after the registration process is completed
            // setIsRegistering(false);


        } catch (error) {
            console.error('Registration failed:', error.response.data);
            alert('Registration failed!');
            // Handle registration failure
        }
    };



    //   

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform client-side email and password format validation
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            alert(
                'Incoreect Password'
            );
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/login`, {
                email: email,
                password: password
            });

            if (response.data.token) {
                localStorage.setItem('auth-token', response.data.token);
                localStorage.setItem('employeeID', response.data.employeeID);
                localStorage.setItem('premission', response.data.premission);
                localStorage.setItem('user-id', response.data.employeeID);
                localStorage.setItem('obj-id', response.data._id);
                localStorage.setItem('location', response.data.location);
                // auto logout
                const logoutTime = Date.now() + 60 * 60 * 1000; // 60 minutes
                localStorage.setItem('logoutTime', logoutTime.toString());
                alert('Login successfully');
                navigate('/');
                window.location.reload();
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.log('Error:', error);
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert('Incoreect Email or Password');
            }
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    };


    return (
        <form className="login-form box" onSubmit={handleSubmit}>
            <div className="field">
                <p className="control has-icons-left">
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <button type="submit" className="button is-success">
                        Login
                    </button>
                </p>
            </div>
            <FacebookLogin
                cssClass="button login-button is-success"
                appId="6453081621390258"
                autoLoad={false}
                fields="name,email,picture"
                // scope="public_profile,user_gender,user_birthday,user_location,user_friends"
                callback={responseFacebook}

            />
            <GoogleLogin></GoogleLogin>
            <br></br>
            <Link to="/registration">
                <div className="field">
                    <p className="control">
                        <button type="submit" className="button is-success">
                            Register
                        </button>
                    </p>
                </div>
            </Link>
        </form>

    );
};

export default LoginForm;
