import React, { useState } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import { useHistory, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                localStorage.setItem('position', response.data.position);
                // auto logout
                const logoutTime = Date.now() + 60 * 60 * 1000; // 60 minutes
                // const logoutTime = Date.now() + 1 * 5 * 1000; // 5 s for demo
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
        </form>
    );
};

export default LoginForm;
