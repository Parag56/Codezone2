import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navlinks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyVerticallyCenteredModal1 from "./Welcomemodal";
import MyVerticallyCenteredModal2 from './Aboutmodal' 
function NavLinks() {
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="#" onClick={() => setModalShow1(true)}>
          Welcome
        </Link>
        <MyVerticallyCenteredModal1 
          show={modalShow1}
          onHide={() => setModalShow1(false)}
        />
      </li>
      <li>
        <Link to="#" onClick={() => setModalShow2(true)}>About Us</Link>
        <MyVerticallyCenteredModal2
          show={modalShow2}
          onHide={() => setModalShow2(false)}
        />
      </li>
      <li>
        <Link to="/login">Signup/Login</Link>
      </li>
    </ul>
  );
}

export default NavLinks;
