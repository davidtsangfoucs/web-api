import React from 'react'
import Header from '../component/Header'
import HeroBg from '../component/HeroBg'
import LoginForm from '../component/LoginForm'

const LoginPage = () => {
    return (
        <div>
            <Header></Header>
            <div className="container">
                <HeroBg />
                <LoginForm />
            </div>
        </div>

    )
}

export default LoginPage
