import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { View } from "./view";
import { AddView } from "./addview";
import { DeleteView } from "./deleteView";

export function Transaction({ data, getData }) {
  // useStates for pop-up logic for add, delete, update
  const [show, setShow] = useState(false);
  const [row, setRow] = useState(false);
  const [showDelete, setDelete] = useState(false);

  // useStates for front-end UI
  // const [numData, setNumData] = useState(5);
  const [showData, setShowData] = useState([]);
  // const [filterOptions, setFilterOptions] = useState("All");

  const history = useHistory();

  const handleClose = () => {
    setShow(false);
    getData();
  };
  const handleUpdate = () => {
    setShow(false);
    getData();
  };

  const handleDelete = () => setDelete(true);
  const closeDelete = () => setDelete(false);

  const handleShowAll = () => {
    console.log("In");
    history.push("/history");

    const element = document.getElementById("home");
    element.classList.remove("underline");
  };

  const closeAdd = () => setRow(false);
  const showAdd = () => setRow(true);

  const [itemData, setItem] = useState(null);

  useEffect(() => {
    setShowData(() => data.slice(0, 5));
  }, [data]);

  // Display Month transactions for this month

  // function showMonth(monthData) {
  //   const monthDataArray = [];
  //   for (let i = 0; i < monthData.length; i += 1) {
  //     const date = monthData[i].date.slice(5, 16);
  //     const monthYear = date.slice(3, 11);

  //     const currDate = new Date();
  //     const currMonthYear = `${currDate.toLocaleString("default", {
  //       month: "short",
  //     })} ${currDate.getFullYear()}`;
  //     if (currMonthYear === monthYear) {
  //       monthDataArray.push(monthData[i]);
  //     }
  //   }

  //   setShowData(monthDataArray);
  // }

  // function showYear(yearData) {
  //   const yearDataArray = [];
  //   for (let i = 0; i < yearData.length; i += 1) {
  //     const date = yearData[i].date.slice(5, 16);
  //     const year = date.slice(7, 11);

  //     const currDate = new Date();
  //     const currYear = currDate.getFullYear().toString();

  //     if (currYear === year) {
  //       yearDataArray.push(yearData[i]);
  //     }
  //   }
  //   setShowData(yearDataArray);
  // }

  // function showWeek(weekData) {
  //   const weekDataArray = [];
  //   for (let i = 0; i < weekData.length; i += 1) {
  //     const today = new Date();

  //     const date = weekData[i].date.slice(5, 16);
  //     const day = date.slice(0, 2);
  //     const month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(date.slice(3, 6)) / 3;
  //     const year = date.slice(7, 11);

  //     const lastWeekDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).getDay().toString();
  //     const lastWeekMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).getMonth().toString();
  //     const lastWeekYear = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
  //       .getFullYear()
  //       .toString();

  //     const currDay = today.getDate().toString();
  //     const currMonth = today.getMonth().toString();
  //     const currYear = today.getFullYear().toString();

  //     const D_1 = [lastWeekDay, lastWeekMonth, lastWeekYear];
  //     const D_2 = [currDay, currMonth, currYear];
  //     const D_3 = [day, month, year];
  //     const d1 = new Date(D_1[2], parseInt(D_1[1]), D_1[0]); // eslint-disable-line
  //     const d2 = new Date(D_2[2], parseInt(D_2[1]), D_2[0]); // eslint-disable-line
  //     const d3 = new Date(D_3[2], parseInt(D_3[1]), D_3[0]); // eslint-disable-line

  //     if (d3 >= d1 && d3 <= d2) {
  //       weekDataArray.push(weekData[i]);
  //     }
  //   }
  //   setShowData(weekDataArray);
  // }

  // function handleFilter(e) {
  //   if (e.target.value === "Week") {
  //     showWeek(data);
  //   } else if (e.target.value === "Month") {
  //     showMonth(data);
  //   } else if (e.target.value === "Year") {
  //     showYear(data);
  //   } else {
  //     setShowData(() => data.slice(0, numData));
  //   }
  // }
  console.log(data);
  return (
    <div>
      <div className="transaction">
        {data.length === 0 ? (
          <b>No transactions to show</b>
        ) : (
          <>
            <table className="transactionsTable">
              <thead>
                <th />
                <th>Amount</th>
                <th>Location</th>
                <th>Date</th>
              </thead>
              <tbody>
                {showData.map((item, index) => (
                  <tr
                    onClick={() => {
                      setShow(true);
                      setItem(item);
                    }}
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={index}
                  >
                    {item.type === "Income" ? (
                      <td className="colorTag" style={{ background: "green" }} />
                    ) : (
                      <td className="colorTag" style={{ background: "red" }} />
                    )}
                    <td>${item.amount}</td>
                    <td>{item.location}</td>
                    <td>{item.date}</td>
                    <td
                      onClick={(e) => {
                        handleDelete();
                        setItem(item);
                        e.stopPropagation();
                      }}
                    >
                      <Trash className="trash" />
                    </td>
                  </tr>
                ))}
                {show ? (
                  <div style={{ display: "none" }} onClick={(e) => e.stopPropagation()}>
                    <View
                      list={itemData}
                      show={show}
                      onHide={handleClose}
                      toogleUpdate={handleUpdate}
                      updateData={getData}
                    />
                  </div>
                ) : null}
                {showDelete ? (
                  <div style={{ display: "none" }}>
                    <DeleteView
                      list={itemData}
                      updateData={getData}
                      closeDelete={closeDelete}
                      showDelete={showDelete}
                    />
                  </div>
                ) : null}
              </tbody>
            </table>
            <div className="showMore">
              <a onClick={() => handleShowAll()}>...Show All</a>
            </div>
          </>
        )}
      </div>
      <Button variant="success" onClick={() => showAdd()}>
        Add
      </Button>
      {}
      <div style={{ display: "none" }} onClick={(e) => e.stopPropagation()}>
        <AddView endPoint="/add" updateData={getData} show={row} onHide={closeAdd} showAdd={showAdd} />
      </div>
    </div>
  );
}
Transaction.propTypes = {
  data: PropTypes.instanceOf(Array),
  getData: PropTypes.func,
};
Transaction.defaultProps = {
  data: PropTypes.instanceOf(Array),
  getData: PropTypes.func,
};
export default Transaction;
