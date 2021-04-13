/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import '../App.css';
import { View } from './view.js';
import { AddView } from './addview.js';

export function Home() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const [row, setRow] = useState(false);
  const [itemData,setItem] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const closeAdd = () => setRow(false);
  const showAdd = () => setRow(true);

  function getData(){
      fetch('/home')
      .then((res) => res.json())
      .then((val) => {
        setData(val);
      });
  }

    function getUserInfo() {
        fetch('/userInfo')
        .then((res) => res.json())
        .then((val) => {
        setUserData(val);
        });
    }
  useEffect(() => {
    getData();
  }, []);
  
  useEffect(() => {
      getUserInfo();
  }, [data]);

  return (
    <div>
        <div>
            Welcome, {userData.User}
        </div>
        <div className="Home">
            <div className="balanceBoard">
                <div className="totalBalance">
                    Total balance: {userData.Balance}
                </div>
                <div className="totalIncome">
                    Total income: {userData.Income}
                </div>
                <div className="totalExpense">
                    Total expense: {userData.Expense}
                </div>
            </div>
            <div className="transaction">
              {data.length === 0 ? (
                <b>No transactions to show</b>
              ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Location</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr onClick={() => { setShow(true); setItem(item)}}>
                        <td>{item.amount}</td>
                        <td>{item.location}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
                    {show ? (
                        <div style={{ display: 'none' }} onClick={(e) => e.stopPropagation()}>
                          <View list={itemData} show={show} onHide={handleClose} />
                        </div>
                    ): null}
                  </tbody>
                </table>
                <Button variant="success" onClick={() => showAdd()}>
                  Add
                </Button>
                <div style={{ display: 'none' }} onClick={(e) => e.stopPropagation()}>
                  <AddView updateData={getData} show={row} onHide={closeAdd} />
                </div>
                
              </>
              )}
            </div>
        </div>
    </div>
  );
}

export default Home;
