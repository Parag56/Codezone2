import React,{useState} from 'react'
import './Navbar.css'
import NavLinks from '../Navlinks/Navlinks'
import mylogo from './logo1.png'
import {Link} from 'react-router-dom'
function Navbar() {
    
    
        document.addEventListener("scroll", function() {
            var header = document.querySelector(".codezone-header");
            if(header)
            header.classList.toggle("sticky", window.scrollY > 0);
          })
              
     
           
    return (
        <div>
         <div className="codezone-header">
             <Link to="/" className="logo"><img src={mylogo} className="mylogo"></img></Link>
             <div className="codezone-nav">
                 <NavLinks/>
             </div>
         </div>
        </div>
    )
}

export default Navbar
