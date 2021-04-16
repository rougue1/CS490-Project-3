import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

//form validation

export function AddView({ updateData, show, onHide }) {
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    //send to backend
    const res = await fetch('/add', {
      method: 'POST',
      body: JSON.stringify({
        formDataObj,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (data === 200) {
      updateData();
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense or Income</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onFormSubmit}>
        <Modal.Body>
          <Form.Label>Type</Form.Label>
          <Form.Control as="select" name="type">
            <option>Income</option>
            <option>Expense</option>
          </Form.Control>

          <Form.Label>Amount: </Form.Label>
          <Form.Control type="number" name="amount" step="0.01" min="0" />

          <Form.Label>Date: </Form.Label>
          <Form.Control type="date" name="date" />

          <Form.Label>Location: </Form.Label>
          <Form.Control type="text" name="location" />

          <Form.Label>Description: </Form.Label>
          <Form.Control as="textarea" name="description" />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={onHide}>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

AddView.propTypes = {
  updateData: PropTypes.Array,
  show: PropTypes.bool,
  onHide: PropTypes.bool,
};
AddView.defaultProps = {
  updateData: PropTypes.Array,
  show: PropTypes.bool,
  onHide: PropTypes.bool,
};

export default AddView;
