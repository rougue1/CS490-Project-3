import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function View({ list, show, onHide, toogleUpdate, updateData}) {
  // alert(list.amount)
  // function deleteRow(){
   
  // }
  const toggleDelete = async (e) => {
        onHide();
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
        console.log(data);

        if (data === 200) {
            console.log("Stored in db!");
            updateData();
            
        }
        
      }
    
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Amount:
          {list.amount}
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
        <Button variant="primary" onClick={toogleUpdate}>
          Update
        </Button>
        <Button variant="danger" onClick={toggleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

View.propTypes = {
  show: PropTypes.bool,
  updateData: PropTypes.Array,
  onHide: PropTypes.bool,
  toogleUpdate: PropTypes.bool,
  list: PropTypes.instanceOf(Array),
};
View.defaultProps = {
  show: PropTypes.bool,
  updateData: PropTypes.Array,
  onHide: PropTypes.bool,
  toogleUpdate: PropTypes.bool,
  list: PropTypes.instanceOf(Array),
};

export default View;