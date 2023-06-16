import React from 'react'
import Header from '../component/Header'
import ManageCatsTable from '../component/ManageCatsTable'

const ManageCatsPage = () => {
    return (
        <div>
            <Header></Header>
            <div className='container'>
                <ManageCatsTable></ManageCatsTable>
            </div>
        </div>
    )
}

export default ManageCatsPage
