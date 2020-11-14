import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./Animation.css";
function Animation() {
  useEffect(() => {
    const t1 = gsap.timeline({ defaults: { ease: "power1.out" } });
    t1.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
    t1.to(".slider", { y: "-100%", duration: 1.5, delay: 0.4 });
    t1.to(".intro", { y: "-100%", duration: 1 }, "-=1");
  });

  return (
    <div className="page">
      <div className="intro">
        <div className="intro-text">
          <h1 className="hide">
            <span className="text">Welcome to</span>
          </h1>
          <h1 className="hide">
            <span className="text">
              CODE<sider>ZONE</sider>
            </span>
          </h1>
          <h1 className="hide">
            <span className="text">Collab Draw Share</span>
          </h1>
        </div>
      </div>
      <div className="slider"></div>
    </div>
  );
}

export default Animation;
