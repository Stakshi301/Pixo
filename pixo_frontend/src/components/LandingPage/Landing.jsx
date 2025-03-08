import React from 'react';
import './Landing.css'
import pixoBg from '../../assets/pixoBg.jpeg';
import ExportBtn from '../ExploreButton/ExploreBtn';
const Landing = () => {
  return (
    <>
     <div className="hero">
        <img src={pixoBg} alt="Hero Image" className="hero-image" />
        <div className="hero-content">
            <h1 className='LandingHead'>Discover Your Next Inspiration!</h1>
            <p className='LandingPera'>Explore a world of images and creativity.</p>
            <ExportBtn />
        </div>
    </div>
    </>
  )
}

export default Landing