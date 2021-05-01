import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { View } from "./view";
import { AddView } from "./addview";
import { DeleteView } from "./deleteView";

export function Transaction({ data, getData }) {
  const [show, setShow] = useState(false);
  const [row, setRow] = useState(false);
  const [showDelete, setDelete] = useState(false);

  const [showData, setShowData] = useState([]);
  
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
