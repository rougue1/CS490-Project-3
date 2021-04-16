/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import '../App.css';
import { Transaction } from './transactions.js';

export function Home() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});

  function getData() {
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
    // fetch('/home')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //   });
    getData();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [data]);

  return (
    <div>
      <div>
        <h1>Welcome, {userData.full_name}</h1>
      </div>
      <div className="Home">
        <div className="balanceBoard">
          <div className="totalBalance">
            Total balance: <h3>{userData.balance}</h3>
          </div>
          <div className="totalIncome">
            Total income: <h4>{userData.income}</h4>
          </div>
          <div className="totalExpense">
            Total expense: <h4>{userData.expense}</h4>
          </div>
        </div>
        <Transaction data={data} getData={getData} />
      </div>
    </div>
  );
}

export default Home;
