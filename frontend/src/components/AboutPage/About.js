import React from 'react'
import MainHeader from './MainHeader';
import './About.css'
import Card from './Card/Card';

function About() {
    return (
     <div className="about-us">
         <MainHeader />
         <h1 className="head">Developer Team</h1>
         <div className="card__container">
         <Card
         name="Prajwal"
         post="Web Designer,UI designer,photographer,web developer,etc" 
         title="Sasta web-developer" />
        <Card
         name="Parag"
         post="Web Designer,UI designer,photographer,web developer,etc" 
         title="Mahnga web-developer" />
         </div>
         
     </div>
    )
}

export default About

