import React from 'react';
import PIXO from '../../assets/PIXO.png';
import { useNavigate } from 'react-router-dom';
import Theme from '../Theme/Theme';
import './NavFoot.css';

const Navbar = ({ searchTerm, setSearchTerm }) => {

    const navigate = useNavigate();

    const handleLogin=()=>{
        navigate('/login');
    }
    return (
        <>
            <div className='navContainer'>
                <img src={PIXO} alt="logo" className='NavLogo' onClick={() => navigate('/')} />
                <input type="text" id="search" placeholder='Search your ideas...'  value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
                <div id="btncontainer">
                    <Theme />
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>
            </div>

        </>
    );
};

export default Navbar;
