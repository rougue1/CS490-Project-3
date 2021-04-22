/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
// import PropTypes from 'prop-types';
import "../App.css";
import { Transaction } from "./transactions.js";

export function Home({userData, getUserInfo}) {
  const [data, setData] = useState([]);
  
  function getData() {
    fetch("/home")
      .then((res) => res.json())
      .then((val) => {
        setData(val);
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
