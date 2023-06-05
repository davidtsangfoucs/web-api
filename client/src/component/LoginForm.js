import React, { useState } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import { useHistory, useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

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

    const responseFacebook = (response) => {

        axios
            .get(`https://graph.facebook.com/me?fields=name,email,picture&access_token=${response.accessToken}`)
            .then((res) => {
                console.log('res', res)
                alert({ res })
                // setName(res.data.name);
                // setBirthday(res.data.birthday);
                // setFbCount(res.data.friends.summary.total_count);
                // setLoggedIn(true);
                // setUserInfo(res.data);

                // localStorage.setItem('userData', JSON.stringify(res.data));
                localStorage.setItem('auth-token', true);
                localStorage.setItem('premission', "Public User");
                // need using facebook data to register the acc ? 

                // yes





                // navigate('/');

            })
            .catch((err) => {
                console.error(err);
            });
    };

    const logout = () => {
        setName('');
        setBirthday('');
        setFbCount(0);
        setLoggedIn(false);
        localStorage.setItem('isLoggedIn', false);
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
            <FacebookLogin
                cssClass="button login-button is-success"
                appId="6453081621390258"
                autoLoad={false}
                fields="name,email,picture"
                // scope="public_profile,user_gender,user_birthday,user_location,user_friends"
                callback={responseFacebook}

            />
        </form>

    );
};

export default LoginForm;
