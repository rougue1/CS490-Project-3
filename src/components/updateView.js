import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

//form validation

export function UpdateView({ updateData, show, onHide }) {
  const onUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    const res = await fetch('/update', {
      method: 'POST',
      body: JSON.stringify({
        formDataObj,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);

    if (data === 200) {
      console.log('Stored in db!');
      updateData();
    }
  };
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
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
UpdateView.propTypes = {
  updateData: PropTypes.Array,
  show: PropTypes.bool,
  onHide: PropTypes.bool,
};
UpdateView.defaultProps = {
  updateData: PropTypes.Array,
  show: PropTypes.bool,
  onHide: PropTypes.bool,
};
export default UpdateView;
