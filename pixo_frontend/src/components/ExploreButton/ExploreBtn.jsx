import React from 'react';
import { useNavigate } from "react-router-dom";
import './ExploreBtn.css';

const ExportBtn = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/MainPage');
    };

    return (
        <button onClick={handleClick} className='explore-button'>Explore Now</button>
    );
};

export default ExportBtn;
