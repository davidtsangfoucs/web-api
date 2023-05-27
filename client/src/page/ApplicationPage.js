import React, { useState } from 'react'
import ApplicationForm from '../component/ApplicationForm'
import Header from '../component/Header'

const ApplicationPage = () => {



    return (
        <div>
            <Header></Header>
            <div className='container'>
                <img src={require('../images/background.jpeg')}></img>
            </div>

            {/* application form */}
            <ApplicationForm></ApplicationForm>

        </div>
    )
}

export default ApplicationPage
