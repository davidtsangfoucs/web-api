import React, { useState } from 'react';
// import './LoginForm.scss';

const LoginForm = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform server-side validation and authentication
        if (emailAvailable && validatePassword(password)) {
            // Proceed with login process
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