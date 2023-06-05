import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'
import HeroBg from '../component/HeroBg'

const HomePage = () => {
  return (
    <div className='home-page'>
      <Header></Header>
      <div className='container'>
        {/* <HeroBg></HeroBg> */}

        {/* <div className='text-box'>
          <br></br>
          <Link to="/application">
            <button class="button is-primary is-large">開始預約</button>
          </Link>
        </div> */}
      </div>


    </div>
  )
}

export default HomePage
