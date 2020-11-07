import React from 'react'
import Navbar from './MainPageutils/Navbar/Navbar.js'
import Footer from './MainPageutils/Footer/Footer'
import Maincontent from './MainPageutils/Body/maincontent'
function Mainpage() {
    return (
        <div>
            <Navbar/>
            <Maincontent/>
            <Footer/>
        </div>
    )
}

export default Mainpage
