import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
function ErrorModal({error,onClear}) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
      onClear()    
      setShow(false);
    }
    useEffect(()=>{
      if(error!=null)setShow(true)
    },[error])
    return (
      <>
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>ERROR!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default ErrorModal