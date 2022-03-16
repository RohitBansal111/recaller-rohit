import React from 'react'
import CardMedia1 from './../../assets/images/card-icon1.png'
import CardMedia2 from './../../assets/images/card-icon2.svg'

const ActivityCardContent = () => {
  return (
    <ul className='card-listingtabs'>
        <li>
          <div className="card-tab-media">
            <img src={CardMedia1} alt="Card Media 1" />
          </div>
          <div className="card-tav-content">
              <p> Welcome to your Activity Feed! All of your updates and highlights will be shown here </p>
          </div>
        </li>
        <hr className='listBreak'/>
        <li>
          <div className="card-tab-media">
            <img src={CardMedia2} alt="Card Media 2" />
          </div>
          <div className="card-tav-content">
              <p> Learn more about LocalMessages by visiting our Help Centre </p>
          </div>
        </li>
    </ul>
  )
}

export default ActivityCardContent