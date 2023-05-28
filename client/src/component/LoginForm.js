import React, { useState } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import { useHistory, useNavigate } from 'react-router-dom';
// import './LoginForm.scss';

const LoginForm = () => {
    const navigate = useNavigate(); // Declare this variable

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailAvailable, setEmailAvailable] = useState(true);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailAvailable(validateEmail(value));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };





    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform server-side validation and authentication
        if (emailAvailable && validatePassword(password)) {
            try {
                const response = await axios.post(`${baseURL}/login`, {
                    email: email,
                    password: password
                });

                if (response.data.token) {
                    // Save the token to localStorage or cookie
                    localStorage.setItem('auth-token', response.data.token);
                    localStorage.setItem('employeeID', response.data.employeeID);
                    localStorage.setItem('position', response.data.position);
                    // set outo logout 
                    // When you set user's login status

                    // Then you can setup the auto-logout after 60 mins
                    const logoutTime = Date.now() + 60 * 60 * 1000; // 60 minutes
                    // Store the logoutTime in localStorage, so you can access it on page load
                    localStorage.setItem('logoutTime', logoutTime.toString());

                    // Redirect the user to dashboard or home page
                    alert("Login sucessfully")
                    // Use the navigate function to navigate to home page
                    navigate('/');
                    window.location.reload();
                } else {
                    // Display appropriate error messages
                }
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            // Display appropriate error messages
        }
    };

    const validateEmail = (email) => {
        // Simple email validation on the client-side
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Password validation on the client-side
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    };


    return (
        <form className="login-form box" onSubmit={handleSubmit}>
            <div className="field">
                <p className={`control has-icons-left has-icons-right ${!emailAvailable ? 'has-icons-right-danger' : ''}`}>
                    <input
                        className={`input ${!emailAvailable ? 'is-danger' : ''}`}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    {!emailAvailable && (
                        <span className="icon is-small is-right">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                    )}
                    {emailAvailable && (
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    )}
                </p>
                {!emailAvailable && (
                    <p className="help is-danger">Please enter a valid email address</p>
                )}
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
        </form>
    );
};

export default LoginForm;
