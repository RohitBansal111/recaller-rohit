import React from 'react'
import { Link } from 'react-router-dom'
import HelpIcon from '@mui/icons-material/Help';
import ReferralIcon from './../../assets/icons/icon-referrals.svg'
import PosterImage from './../../assets/images/placeholder.jpg'

const AboutTab = () => {
  return (
    <div className="content-center-box">
        <div className="search-about-card">
            <div className="local-referal-box">
                <div className="referral-header">
                    <div className="icon-heading">
                        <img src={ReferralIcon} alt="ReferralIcon" />
                        <div className="heading-bar">
                            <h3>LocalReferrals  </h3>
                            <p>Get More Referrals, Automatically</p>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary">Get Started</button>
                </div>
                <div className="referrals-point-video">
                    <div className="referrals-points-content">
                      <ul>
                        <li>Design your custom referral program and integrate it into your website.</li>
                        <li>Share your referral program with your customers and watch as your advocates enroll into the program.</li>
                        <li>Easily manage and track all of your customers as they refer their friends.</li>
                        <li>Watch as new referrals roll in and reward your advocates automatically.</li>
                      </ul>
                    </div>
                    <div className="ref-video-box">
                      <video controls="controls" controlslist="nodownload" disablepictureinpicture="disablePictureInPicture" poster={PosterImage} ol-video-sources="video.sources" ol-video-viewed="video.onViewed()" ol-video-poster="video.poster">
                        <source src="https://gatalabs.s3.amazonaws.com/videos/RM-dashboard.mp4" type="video/mp4" />
                      </video>
                    </div>
                </div>
            </div>
            <ul>
              <li>
                  <p>
                    <HelpIcon />
                    Want to see how it works? Try OneLocal's Referral Program!
                  </p>
                  <Link to="/" target="_blank">Try It Now!</Link>
              </li>
              <li>
                  <p>
                    <HelpIcon />
                    Learn about the 8 keys to launching a profitable referral program!
                  </p>
                  <Link to="/" target="_blank">Learn More</Link>
              </li>
            </ul>
        </div>
    </div>
  )
}

export default AboutTab