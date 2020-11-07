import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./About.css";
import Card from './Card'
function MyVerticallyCenteredModal2(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="myabout">
          Developer<span>Team</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="developer-cards">
        <Card
         name="Prajwal"
         post="Web Designer,UI designer,photographer,web developer,etc" 
         title="Sasta web-developer" />
        <Card
         name="Parag"
         post="Web Designer,UI designer,photographer,web developer,etc" 
         title="Mahnga web-developer" />
         </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="welc-btn" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal2;
