import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { View } from './view.js';
import { AddView } from './addview.js';
import { UpdateView } from './updateView.js';
import '../App.css';
import PropTypes from 'prop-types';
export function Transaction({data, getData})
{
    const [show, setShow] = useState(false);
    const [row, setRow] = useState(false);
   
    const [ showUpdate, setUpdate ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const handleUpdate = () => {
      setShow(false);
      setUpdate(true);
    }

    const closeAdd = () => setRow(false);
    const showAdd = () => setRow(true);
    const closeUpdate = () => setUpdate(false);

    const [itemData,setItem] = useState(null);

    return (
      <div>
        <div className="transaction">
        {data.length === 0 ? (
          <b>No transactions to show</b>
          ) : (
          <>
          <table className="transactionsTable">
            <thead>
                <th></th>
                <th>Amount</th>
                <th>Location</th>
                <th>Date</th>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr onClick={() => { setShow(true); setItem(item)}} key={index}>
                  {item.type === 'Income' ?
                    <td className="colorTag" style={{ background: 'green' }}></td> :
                    <td className="colorTag" style={{ background: 'red' }}></td>
                  }
                  <td>$ {item.amount}</td>
                  <td>{item.location}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
              {show ? (
                  <div style={{ display: 'none' }} onClick={(e) => e.stopPropagation()}>
                    <View list={itemData} show={show} onHide={handleClose} toogleUpdate={handleUpdate} updateData={getData}/>
                  </div>
              ): null}
            </tbody>
          </table>
          </>
        )}
        </div>
        <Button variant="success" onClick={() => showAdd()}>
              Add
        </Button>
        {showUpdate ?
          (
          <div style={{ display: 'none' }} onClick={(e) => e.stopPropagation()}>
          <UpdateView updateData={getData} show={showUpdate} onHide={closeUpdate} /> 
          </div>)
          : 
          null}
        <div style={{ display: 'none' }} onClick={(e) => e.stopPropagation()}>
          <AddView updateData={getData} show={row} onHide={closeAdd} />
        </div>
      </div>
    );
}

Transaction.propTypes = {
  data: PropTypes.instanceOf(Array),
  getData: PropTypes.object,
};
Transaction.defaultProps = {
  data: PropTypes.instanceOf(Array),
  getData: PropTypes.object,
};

export default Transaction;