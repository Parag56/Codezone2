import React from 'react'
import './FeatureCard.css'

function FeatureCard(props) {
    return (
        <div className="feature_card">
            <div className="cardicon">
  
          <img src={props.icon} className="svglogo"/>


            </div>
            <div className="cardheading">
            <h1>{props.heading}</h1>
            </div>
            <div className="cardcontent">
             <p>
            {props.content}
             </p>
            </div>
        </div>
    )
}

export default FeatureCard
