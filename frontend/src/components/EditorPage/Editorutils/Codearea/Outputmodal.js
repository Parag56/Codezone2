import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Outputmodal.css";

function MyVerticallyCenteredModal5(props) {
 useEffect(()=>{
   if(document.querySelector('td'))
   document.querySelector('td').insertAdjacentHTML('beforeend',props.output)
 },)
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Body className="modalbody">
        <div className="codeid">
          Code ID:&nbsp;<span>{props.id}</span>
        </div>
        <div className="compilestatus">
          <div className="compileresult">
            Compile Status:&nbsp;
            {props.compile === "OK" && props.status==='NA'? (
              <span className="successfulcommpile">Compiled Successfully</span>
            ) : (
              <span className="errorcompile">{props.status==='SIGSEGV'?'Segmentation fault':props.compile}</span>
            )}
          </div>
          <div className="timeresult">
            Time:&nbsp;<span>{props.time}</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Output:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="exitcode">
          exit code:&nbsp;<span>{props.exitcode}</span>
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
export default MyVerticallyCenteredModal5;
