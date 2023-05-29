import React, { useState } from 'react'
import ApplicationForm from '../component/ApplicationForm'
import Header from '../component/Header'
import ApplicationListTable from '../component/ApplicationListTable'
import ManageAccountsTable from '../component/ManageAccountsTable'

const ManageAccountsPage = () => {



    return (
        <div>
            <Header></Header>
            <div className='container'>
                <ManageAccountsTable></ManageAccountsTable>
            </div>

        </div>
    )
}

export default ManageAccountsPage
