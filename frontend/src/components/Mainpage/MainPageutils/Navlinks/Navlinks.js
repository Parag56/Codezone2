import React, { useState,useContext} from "react";
import {Link} from "react-router-dom";
import "./Navlinks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyVerticallyCenteredModal1 from "./Welcomemodal";
import MyVerticallyCenteredModal2 from './Aboutmodal' 
import MyVerticallyCenteredModal4 from '../../../Login/LoginModal'
import {AuthContext} from '../../../Context/Auth-context'
function NavLinks() {
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);
  const auth=useContext(AuthContext)
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
      {!auth.isloggedin && (
        <li>
        <Link to="#" onClick={()=>setModalShow4(true)}>Signup/Login</Link>
        <MyVerticallyCenteredModal4
          show={modalShow4}
          onHide={() => setModalShow4(false)}
          />
      </li>
      )}
      {
        auth.isloggedin &&(
          <li>
            <Link to="#" onClick={auth.logout}>Logout</Link>
          </li>
        )
      }
      
    </ul>
  );
}

export default NavLinks;