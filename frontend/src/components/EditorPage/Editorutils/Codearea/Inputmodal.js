import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Inputmodal.css";

function MyVerticallyCenteredModal6(props) {
    const inputsetter=(e)=>{
        props.setuserinput(e.target.value)
    }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div >
         <div className="form-group" id="heightsetter">
          <textarea type="textarea" value={props.userinput} onChange={inputsetter}/>
         </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="welc-btn" onClick={props.onHide}>
          Add Input
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal6;
