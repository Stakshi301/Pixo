

import { useState } from "react";
import { CgDarkMode } from "react-icons/cg";
import './Theme.css'

const Theme=()=>{
    const[dark,setDark]=useState(false);

    const toggleBtn=()=>{
        setDark(!dark);
        document.body.classList.toggle( 'dark-mode');
    }
    return(
        <>
        <div id="theme">
        <button className="Themebtn" onClick={toggleBtn}>
        {dark?"🌕" : "🌑"}
        </button>
        </div>
        </>
    )
}


export default Theme