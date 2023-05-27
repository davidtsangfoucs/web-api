import React from 'react'
import Header from '../component/Header'
import LoginForm from '../component/LoginForm'

const LoginPage = () => {
    return (
        <div>
            <Header></Header>
            <div className="container">
                <img src={require('../images/background.jpeg')}></img>
                <LoginForm />
            </div>
        </div>

    )
}

export default LoginPage
