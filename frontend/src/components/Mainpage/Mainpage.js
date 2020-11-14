import React from "react";
import Navbar from "./MainPageutils/Navbar/Navbar.js";
import Footer from "./MainPageutils/Footer/Footer";
import Maincontent from "./MainPageutils/Body/maincontent";
import Animation from "../AnimationPage/Animation";
function Mainpage() {
  return (
    <div>
      <Animation />
      <div>
        <Navbar />
        <Maincontent />
        <Footer />
      </div>
    </div>
  );
}

export default Mainpage;
