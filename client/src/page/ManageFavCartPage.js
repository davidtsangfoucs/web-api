import React from 'react'
import Header from '../component/Header'
import ManageFavCartTable from '../component/ManageFavCartTable'

const ManageFavCartPage = () => {
    return (
        <div>
            <Header></Header>
            <div className='container'>
                <ManageFavCartTable></ManageFavCartTable>
            </div>
        </div>
    )
}

export default ManageFavCartPage
