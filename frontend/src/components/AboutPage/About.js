import React from "react";
import "./About.css";
import Card from "./Card/Card";
import dev from "./web-development.svg";
import parag from "./parag_2.jpg";
import Prj from "./Prajwal.jpg";

function About() {
  return (
    <div className="about-us">
      <div className="strip">
        <div className="line1"></div>

        <div className="dv-images">
          <img className="dv" src={dev}></img>
          <img className="dv" src={dev}></img>
          <img className="dv" src={dev}></img>
        </div>
        <div className="line2"></div>
      </div>
      <div className="lastsection2">
        <div className="code__heading2">
          <h1 className="lang2">
            Developer <span>Team</span>
          </h1>
        </div>
      </div>
      <div className="card__container">
        <Card
          name="Prajwal"
          post="Web Designer,UI designer,photographer,web developer,etc"
          title="web-developer"
          photo={Prj}
        />
        <Card
          name="Parag"
          post="Web Designer,UI designer,photographer,web developer,etc"
          title="web-developer"
          photo={parag}
        />
      </div>
    </div>
  );
}

export default About;
