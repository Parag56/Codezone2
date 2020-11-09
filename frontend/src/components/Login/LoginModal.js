import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginModal.css";
import { AuthContext } from "../Context/Auth-context";
import $ from "jquery";
import ErrorModal from "./Errormodal";
function MyVerticallyCenteredModal4(props) {
  const auth = useContext(AuthContext);
  const [isloginmode, setisloginmode] = useState(true);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);
  const handlesubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    if (isloginmode) {
      let data = {};
      const url = "http://localhost:5000/codezone/user/login";
      const email = document.getElementById("formBasicEmail").value;
      const password = document.getElementById("formBasicPassword").value;
      data.email = email;
      data.password = password;
      $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        url,
        success: function (data) {
          console.log("success");
          setisloading(false);
          auth.login();
          console.log(JSON.stringify(data));
        },
        error: function (error) {
          setisloading(false);
          seterror(
            error.responseJSON.message ||
              "Something went wrong please try again later"
          );
        },
      });
    } else {
      let data = {};
      const url = "http://localhost:5000/codezone/user/signup";
      const name = document.getElementById("formBasicusername").value;
      const email = document.getElementById("formBasicEmail").value;
      const password = document.getElementById("formBasicPassword").value;
      data.name = name;
      data.email = email;
      data.password = password;
      $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        url,
        success: function (data) {
          console.log("success");
          setisloading(false);
          auth.login();
          console.log(JSON.stringify(data));
        },
        error: function (error) {
          setisloading(false);
          seterror(
            error.responseJSON.message ||
              "Something went wrong please try again later"
          );
        },
      });
    }
  };
  const errorHandler = () => {
    seterror(null);
  };
  const switchhandler = () => {
    setisloginmode((prevMode) => !prevMode);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isloginmode ? "LOGIN" : "SIGNUP"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlesubmit}>
            {!isloginmode && (
              <React.Fragment>
                <Form.Group controlId="formBasicusername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </React.Fragment>
            )}
            {isloginmode && (
              <React.Fragment>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </React.Fragment>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="loginfooter">
          <Button onClick={switchhandler}>
            Switch to {isloginmode ? "Signup" : "Login"}
          </Button>
          <Button className="welc-btn" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
export default MyVerticallyCenteredModal4;
