import React, { useState } from 'react'
import ApplicationForm from '../component/ApplicationForm'
import Header from '../component/Header'
import ApplicationListTable from '../component/ApplicationListTable'

const ApplicationListPage = () => {



    return (
        <div>
            <Header></Header>
            <div className='container'>
                <ApplicationListTable></ApplicationListTable>
            </div>

        </div>
    )
}

export default ApplicationListPage
