import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Transaction } from "./transactions";

export function Home({ userData, getUserInfo }) {
  const [data, setData] = useState([]);

  function getData() {
    fetch("/home")
      .then((res) => res.json())
      .then((val) => {
        console.log(val);
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
  );
}

Home.propTypes = {
  userData: PropTypes.shape,
  getUserInfo: PropTypes.func,
};
Home.defaultProps = {
  userData: PropTypes.shape,
  getUserInfo: PropTypes.func,
};

export default Home;