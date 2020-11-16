import React from 'react'
import './Card.css'
function Card(props) {
    return (
        
        <div className="container">
        <div className="shape">
            <div className="im_age"><img className="photu" src={props.photo}></img></div>
        </div>
    <h3 className="name">{props.name}</h3>
          <h3 className="title">{props.title}</h3>
        <p className="para">{props.post}</p>
        <div className="icons">
        <a class="btn btn-social-icon btn-twitter">
           <span class="fa fa-twitter"></span>
        </a>
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <i className="fa fa-pinterest-p" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
        </div>
       </div>
        
    )
}

export default Card
