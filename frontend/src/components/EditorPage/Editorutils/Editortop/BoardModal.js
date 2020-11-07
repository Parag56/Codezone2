import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Board from './Board'
import "./BoardModal.css";
function MyVerticallyCenteredModal3(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to Code<span>Zone</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="board-body">
        <Board socket={props.socket}/>
      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal3;
