import React, { useContext, useState } from "react";
import "./Editortop.css";
import { Link, NavLink } from "react-router-dom";
import logo from "./logo1.png";
import MyVerticallyCenteredModal3 from "./BoardModal";
import { AuthContext } from "../../../Context/Auth-context";
import MyVerticallyCenteredModal4 from "../../../Login/LoginModal";
function Editortop({ socket }) {
  const auth = useContext(AuthContext);
  const [modalShow3, setModalShow3] = React.useState(false);
  const [modalShow4, setModalShow4] = useState(false);
  return (
    <div className="editortop">
      <div>
        <img src={logo} className="logodesign" />
      </div>

      <div className="userinfo">
        <span className="username">ThisIsUserDope</span>
        <span className="cstyledesign">C++</span>
      </div>

      <ul className="editorfunctionsdesign">
        <li>
          <Link to="#">Share</Link>
        </li>
        <li>
          {auth.isloggedin && (
            <React.Fragment>
              <Link to="#" onClick={() => setModalShow3(true)}>
                Drawing
              </Link>
              <MyVerticallyCenteredModal3
                socket={socket}
                show={modalShow3}
                onHide={() => setModalShow3(false)}
              />
            </React.Fragment>
          )}
          {!auth.isloggedin && (
            <React.Fragment>
              <Link to="#" onClick={() => setModalShow4(true)}>
                Drawing
              </Link>
              <MyVerticallyCenteredModal4
                show={modalShow4}
                onHide={() => setModalShow4(false)}
              />
            </React.Fragment>
          )}
        </li>
        {!auth.isloggedin && (
          <li>
            <Link to="#" onClick={()=>setModalShow4(true)}>Login</Link>
            <MyVerticallyCenteredModal4
             show={modalShow4}
             onHide={()=>setModalShow4(false)}
            />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Editortop;
