/* eslint-disable*/
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { UpdateView } from "./updateView";

export function View({ list, show, onHide, toogleUpdate, getData }) {
  const [showUpdate, setUpdate] = useState(false);

  const handleShow = () => {
    setUpdate(true);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Amount: ${list.amount}</div>
        <div>Date: {list.date}</div>
        <div>Location: {list.location}</div>
        <div>Catagory: {list.category}</div>
        <div>Description: {list.description}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleShow()}>
          Update
        </Button>
      </Modal.Footer>
      <div style={{ display: "none" }} onClick={(e) => e.stopPropagation()}>

        <UpdateView show={showUpdate} onHide={onHide} id={list.id} list={list} />

      </div>
    </Modal>
  );
}
View.propTypes = {
  show: PropTypes.bool,
  getData: PropTypes.func,
  updateData: PropTypes.func,
  onHide: PropTypes.bool,
  toggleUpdate: PropTypes.bool,
  list: PropTypes.instanceOf(Array),
};
View.defaultProps = {
  show: PropTypes.bool,
  getData: PropTypes.func,
  updateData: PropTypes.func,
  onHide: PropTypes.bool,
  toggleUpdate: PropTypes.bool,
  list: PropTypes.instanceOf(Array),
};
export default View;
