import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function DeleteView({ list, updateData, closeDelete, showDelete }) {
  const [viewDelete, setDelete] = useState(showDelete);
  const [theConfirm, setConfirm] = useState(false);
  const [result, setResult] = useState(false);
  
  const handleLocalDelete = () => setDelete(false);
  
  const handleConfirm = () => setConfirm(true);
  const closeConfirm = () => setConfirm(false);
  
  const showResult = () => setResult(true);
  const closeResult = () => setResult(false);
  
  const toggleDelete = async () => {
    const id_data = list.id;
    //send to backend
    const res = await fetch('/delete', {
      method: 'POST',
      body: JSON.stringify({
        id_data,
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
    <div>
      <Modal show={viewDelete} onHide={closeDelete} backdrop="static" keyboard={false}>
        <Modal.Header closeButton >
          <Modal.Title>Delete following items?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Amount:
             ${list.amount}
          </div>
          <div>
            Date:
            {list.date}
          </div>
          <div>
            Location:
            {list.location}
          </div>
          <div>
            Description:
            {list.description}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => { handleConfirm(); handleLocalDelete();}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={theConfirm} onHide={closeConfirm} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the selected items? You CANNOT undo your changes!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={ () => {showResult(); closeConfirm(); toggleDelete();}}> 
            Yes, I want to delete!
          </Button>
          <Button variant="secondary" onClick={ () => {closeConfirm(); closeDelete();}}> 
            No, I do not want to delete!
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={result} onHide={() => {closeResult(); closeDelete();}}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The following items have been deleted!
          <div>
            Amount:
             ${list.amount}
          </div>
          <div>
            Date:
            {list.date}
          </div>
          <div>
            Location:
            {list.location}
          </div>
          <div>
            Description:
            {list.description}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
DeleteView.propTypes = {
  updateData: PropTypes.obj,
  list: PropTypes.instanceOf(Array),
  closeDelete: PropTypes.func,
  showDelete: PropTypes.bool,
};
DeleteView.defaultProps = {
  updateData: PropTypes.obj,
  list: PropTypes.instanceOf(Array),
  closeDelete: PropTypes.func,
  showDelete: PropTypes.bool,
};
export default DeleteView;
