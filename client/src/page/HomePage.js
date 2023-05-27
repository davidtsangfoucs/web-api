import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'

const HomePage = () => {
  return (
    <div className='home-page'>
      <Header></Header>
      <div className='container'>
        <img src={require('../images/background.jpeg')}></img>

        <div className='text-box'>
          <p>
            除社區疫苗接種中心外，市民亦可以預約於私家診所新冠疫苗接種站接種疫苗，或直接與參與疫苗接種計劃的私家醫生及診所預約接種科興疫苗(參與名單 - 按此) 或復必泰疫苗 (參與名單 - 按此)。
            6個月至18歲以下以及50歲或以上的香港居民在指定疫苗接種地點可選擇同時免費接種流感疫苗，詳情請按此。合資格人士可透過本系統預約同時接種兩種疫苗。
          </p>
          <br></br>
          <Link to="/application">
            <button class="button is-primary is-large">開始預約</button>
          </Link>
        </div>
      </div>


    </div>
  )
}

export default HomePage
