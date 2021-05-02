/* eslint-disable*/
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useHistory } from 'react-router'
// form validation


export function UpdateView({ show, onHide, id }) {
  const history = useHistory();
  
  const [validated, setValidated] = useState(false);
  const [theConfirm, setConfirm] = useState(false);
  const [showAnother, setAnother] = useState(false);
  

  // confirmation popup
  const closeConfirm = () => setConfirm(false);
  const viewConfirm = () => {
    setConfirm(true);
  };

  // add another income or expense
  const closeAnother = () => setAnother(false);
  const viewAnother = () => setAnother(true);

  const onUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      // setValidated(true);
    } else {
      onHide(); // hide the pop up
      setValidated(false); // hide errors after correct input fields
      viewConfirm(); // show the confirmation
      // send to backend
      
      const res = await fetch("/update", {
        method: "POST",
        body: JSON.stringify({
          formDataObj,
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data === 200) {}
    }
  };
  return (
    <div>
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton onClick={() => setValidated(false)}>
          <Modal.Title>Update Expense or Income</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onUpdate}>
          <Modal.Body>
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" name="type">
              <option>Income</option>
              <option>Expense</option>
            </Form.Control>

            <Form.Label>Amount: </Form.Label>
            <Form.Control required className="form-control" name="amount" defaultValue = {id.amount} step="0.01" precision="2" min="0" />
            <Form.Control.Feedback type="invalid">Please enter an amount!</Form.Control.Feedback>

            <Form.Label>Date: </Form.Label>
            <Form.Control required type="date" name="date" />
            <Form.Control.Feedback type="invalid">Please select a date!</Form.Control.Feedback>

            <Form.Label>Location: </Form.Label>
            <Form.Control required type="text" name="location" />
            <Form.Control.Feedback type="invalid">Please enter a location!</Form.Control.Feedback>

            <Form.Label>Category: </Form.Label>
            <Form.Control required type="text" name="category" />
            <Form.Control.Feedback type="invalid">Please choose a category!</Form.Control.Feedback>

            <Form.Label>Description: </Form.Label>
            <Form.Control required as="textarea" name="description" />
            <Form.Control.Feedback type="invalid">Please enter a description!</Form.Control.Feedback>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={theConfirm} onHide={closeConfirm}>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your input has been added!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              closeConfirm();
              viewAnother();
            }}
          >
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
UpdateView.propTypes = {
  // getData: PropTypes.func,
  show: PropTypes.bool,
  onHide: PropTypes.bool,
};
UpdateView.defaultProps = {
  // getData: PropTypes.func,
  show: PropTypes.bool,
  onHide: PropTypes.bool,
};
export default UpdateView;
