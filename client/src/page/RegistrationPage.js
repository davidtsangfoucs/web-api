import React, { useState } from 'react'
import ApplicationForm from '../component/ApplicationForm'
import Header from '../component/Header'
import RegistrationForm from '../component/RegistrationForm'

const RegistrationPage = () => {



    return (
        <div className='registration-page'>
            <Header></Header>
            {/* application form */}
            <div className='container'>
                <RegistrationForm></RegistrationForm>
            </div>

        </div>
    )
}

export default RegistrationPage
