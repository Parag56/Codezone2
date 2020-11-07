import React from "react";
import "./maincontents.css";
import backvid from "./backgvid.mp4";
import { Link } from "react-router-dom";
import ideicon from "./ideicon.svg";
import textshare from "./textshare.svg";
import realtime from "./real-time.svg";
import FeatureCard from "../FeatureCards/FeatureCard";
import uuid from "react-uuid";
import cicon from "./computer.svg";
import python from "./python.svg";
import java from "./java.svg";
import javascript from "./js-file.svg";
function Maincontent() {
  return (
    <div className="main-bodycontent">
      <div className="vidback">
        <video src={backvid} className="vid-bg" autoplay="true" loop muted />
        <div className="banner-text">
          <h2>
            Code<span>zone</span>
          </h2>
          <p>Create compile share</p>
          <Link to={`/editor/${uuid()}`} className="get-startedbtn">
            Get started
          </Link>
        </div>
      </div>
      <div className="Features_heading">
        <h1>
          Feat<span>ures</span>
          <hr />
        </h1>
      </div>
      <div className="feature_cards">
        <FeatureCard
          heading="In-browser IDE"
          icon={ideicon}
          content=" Start coding with your favorite language on any platform, OS, and device."
        />
        <FeatureCard
          heading="Live Video Share"
          icon={textshare}
          content="Live video sharing is possible with the people working on a project."
        />
        <FeatureCard
          heading="Real-Time Share"
          icon={realtime}
          content="Live collaboration is possible with the people working on a project and changes can be made by all the persons working on the project."
        />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
      </div>
      <div className="lastsection">
        <div className="code__heading">
          <h1>
            Supported <span>languages</span>
          </h1>
        </div>
        <div className="section">
          <div className="cube">
            <div className="front">
              <img src={cicon} />
            </div>
            <div className="back">
              <img src={python} />
            </div>
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="left">
              <img src={java} />
            </div>
            <div className="right">
              <img src={javascript} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maincontent;
