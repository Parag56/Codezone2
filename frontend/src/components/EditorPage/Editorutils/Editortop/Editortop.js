import React, { useContext, useState } from "react";
import "./Editortop.css";
import logo from "./logo1.png";
import MyVerticallyCenteredModal3 from "./BoardModal";
import { AuthContext } from "../../../Context/Auth-context";
import MyVerticallyCenteredModal4 from "../../../Login/LoginModal";
import MyVerticallyCenteredModal7 from './ShareLink'
function Editortop({ socket,username }) {
  const auth = useContext(AuthContext);
  const [modalShow3, setModalShow3] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);
  const [modalShow7, setModalShow7] = useState(false);
  return (
    <div>
      <div className="solidborder"></div>
    <div className="editortop">
      <div>
        <img src={logo} className="logodesign" />
      </div>

      <div className="userinfo">
        <span className="username">Welcome,</span>
        <span className="username">{username}</span>
      </div>

      <ul className="editorfunctionsdesign">
        <li>
          <div className="editortop-li" onClick={()=>setModalShow7(true)}>Share</div>
          <span></span>
          <MyVerticallyCenteredModal7
                show={modalShow7}
                onHide={() => setModalShow7(false)}
              />
        </li>
        
          {auth.isloggedin && (
              <li><div className="editortop-li" onClick={() => setModalShow3(true)}>
                Drawing
              </div>
              <span></span>
              <MyVerticallyCenteredModal3
                socket={socket}
                show={modalShow3}
                onHide={() => setModalShow3(false)}
              />
              </li>
          )}
          {!auth.isloggedin && (
              <li>
              <div className="editortop-li" onClick={() => setModalShow4(true)}>
                Drawing
              </div>
              <span></span>
              <MyVerticallyCenteredModal4
                show={modalShow4}
                onHide={() => setModalShow4(false)}
              />
              </li>
          )}
        {!auth.isloggedin && (
          <li>
            <div className="editortop-li" onClick={()=>setModalShow4(true)}>Login</div>
            <span></span>
          </li>
        )}
        {auth.isloggedin&&(
          <li>
            <div className="editortop-li" onClick={auth.logout}>Logout</div>
            <span></span>
          </li>
        )}
      </ul>
    </div>
    </div>
  );
}

export default Editortop;
