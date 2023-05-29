import React, { useEffect, useState } from 'react';
// import jwt from 'jsonwebtoken';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate(); // Declare this variable

    // Get the JWT token from local storage
    // const token = localStorage.getItem('auth-token');
    // const localEmployeeID = localStorage.getItem('employeeID');
    // const localPosition = localStorage.getItem('position');


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [position, setPosition] = useState('');

    useEffect(() => {
        // Check if the user is logged in
        const token = localStorage.getItem('auth-token');
        setIsLoggedIn(!!token);

        // Fetch the user's position
        const userPosition = localStorage.getItem('position');
        setPosition(userPosition);
    }, []);


    return (
        <div className='header'>
            <nav class="navbar is-transparent">
                <div class="navbar-brand">
                    <Link to="/">
                        <a class="navbar-item" href="/">
                            <img src={require('../images/logo_tc.png')} alt="Bulma: a modern CSS framework based on Flexbox" />
                        </a>
                    </Link>
                    <div class="navbar-burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div id="navbarExampleTransparentExample" class="navbar-menu">
                    {/* <div class="navbar-start">
                        <a class="navbar-item" href="https://bulma.io/">
                        聯絡我們
                        </a>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
                            私隱政策 
                            </a>
                            <div class="navbar-dropdown is-boxed">
                                <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">
                                    Overview
                                </a>
                                <a class="navbar-item" href="https://bulma.io/documentation/overview/modifiers/">
                                    Modifiers
                                </a>
                                <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                                    Columns
                                </a>
                                <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                                    Layout
                                </a>
                                <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                                    Form
                                </a>
                                <hr class="navbar-divider" />
                                <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                                    Elements
                                </a>
                                <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                                    Components
                                </a>
                            </div>
                        </div>
                    </div> */}

                    <div class="navbar-end">
                        <div class="navbar-item">

                            <div class="field is-grouped">
                                {
                                    position === 'System admin' && isLoggedIn && (
                                        <p class="control">
                                            <Link to="/manage-accounts">
                                                <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                                                    <span class="icon">
                                                        <i class="fa-solid fa-list"></i>
                                                    </span>
                                                    <span>
                                                        Manage Accounts
                                                    </span>
                                                </a>
                                            </Link>
                                        </p>
                                    )
                                }

                                {
                                    position === 'System admin' && isLoggedIn && (
                                        <p class="control">
                                            <Link to="/registration">
                                                <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                                                    <span class="icon">
                                                        <i class="fa-solid fa-registered"></i>
                                                    </span>
                                                    <span>
                                                        Register
                                                    </span>
                                                </a>
                                            </Link>
                                        </p>
                                    )
                                }
                                {
                                    position === 'Medical staff' && isLoggedIn && (
                                        <p class="control">
                                            <Link to="/application-list">
                                                <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                                                    <span class="icon">
                                                        <i class="fa-solid fa-list"></i>
                                                    </span>
                                                    <span>
                                                        Application List
                                                    </span>
                                                </a>
                                            </Link>
                                        </p>
                                    )
                                }
                                {
                                    isLoggedIn ? (

                                        <p className="control">
                                            <a className='button'> <i class="fa-solid fa-user"></i>  <span> {position}</span></a>
                                            <button
                                                className="button is-primary"
                                                onClick={() => {
                                                    localStorage.removeItem('auth-token'); // This will log out the user

                                                    // Use the navigate function to navigate to home page
                                                    navigate('/');
                                                    window.location.reload(); // This will refresh the page to reflect the change
                                                }}
                                            >
                                                <span className="icon">
                                                    <i className="fas fa-sign-out-alt"></i>
                                                </span>
                                                <span>Logout </span>
                                            </button>

                                        </p>

                                    ) : (
                                        <p className="control">
                                            <Link to="/login">
                                                <a className="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.9.4/bulma-0.9.4.zip">
                                                    <span className="icon">
                                                        <i class="fa-regular fa-user"></i>
                                                    </span>
                                                    <span>Login</span>
                                                </a>
                                            </Link>
                                        </p>
                                    )
                                }


                                {/* <p class="control">
                                    <Link to="/login">
                                        <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                                            <span class="icon">
                                                <i class="fab fa-twitter"></i>
                                            </span>
                                            <span>
                                                Forgot Password
                                            </span>
                                        </a>
                                    </Link>

                                </p> */}

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
