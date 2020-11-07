import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Welcome.css";
function MyVerticallyCenteredModal1(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to Code<span>Zone</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="welc-head">
          Code<span>Zone</span>
        </h4>
        <p>
          CodeZone is a realtime collaborative platform that allows users to
          interact with eachother and explain code to eachother with the help of
          real-time functionality users also get the feature of texting.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="welc-btn" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal1;
