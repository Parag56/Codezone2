import React from 'react'
import './Editortop.css'
import { Link, NavLink } from "react-router-dom";
import logo from './logo1.png'
import MyVerticallyCenteredModal3 from './BoardModal'
function Editortop({socket}) {
  const [modalShow3, setModalShow3] = React.useState(false);
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
                <li><Link to="#" >Share</Link></li>
                <li>
                <Link to="#"  onClick={() => setModalShow3(true)}>Drawing</Link>
        <MyVerticallyCenteredModal3
          socket={socket}
          show={modalShow3}
          onHide={() => setModalShow3(false)}
        />
                </li>
                <li><Link to="#">Login</Link></li>
            </ul>
            </div>
    )
}

export default Editortop
