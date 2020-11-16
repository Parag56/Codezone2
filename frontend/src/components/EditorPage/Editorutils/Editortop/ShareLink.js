import React,{useState} from "react";
import Modal from "react-bootstrap/Modal";
import "./ShareLink.css";
import {useParams} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard';
function MyVerticallyCenteredModal7(props) {
    const [value,setvalue] =useState(`${process.env.REACT_APP_FRONTEND_URL}/editor/${useParams().uid}`)
    const [copied,setcopied]=useState(false)
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Copy Link to Share!!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="copyheight">
          <input value={value} />
      <CopyToClipboard text={value}
          onCopy={() => setcopied(prevMode=>!prevMode)}>
          <button className={copied?"copiedbutton":"copybutton"}>{!copied?'copy':'copied!'}</button>
        </CopyToClipboard>
      </Modal.Body>
      <Modal.Footer>
        <button className="fancy"  onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal7;
