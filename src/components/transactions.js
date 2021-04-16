import React, { useState, useEffect } from 'react';
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

    const [ numData, setNumData ] = useState(5);
   
    const [ showData, setShowData ] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = () => {
      setShow(false);
      setUpdate(true);
    }

    const handleShowMore = () => {
      setNumData((currentData) => currentData += 5);
    }
   
    const handleShowLess = () => {
      setNumData((currentData) => currentData -= 5);
    }

    const closeAdd = () => setRow(false);
    const showAdd = () => setRow(true);
    const closeUpdate = () => setUpdate(false);

    const [itemData,setItem] = useState(null);
   
    useEffect(() => {
      setShowData((currData) => {
        const newData = data.slice(0, numData);
        return newData;
      })
    }, [data, numData]);
    
    // Display Month transactions for this month 
   
    function showMonth(data)
    {
      var month_data = [];
      for (var i = 0; i < data.length; i++)
      {
        const date = data[i].date.slice(5, 16);
        const month_year = date.slice(3, 11);
       
        const curr_date = new Date();
         const curr_month_year = curr_date.toLocaleString('default', { month: 'short' }) + ' ' + curr_date.getFullYear();
        if(curr_month_year === month_year)
        {
          month_data.push(data[i])
        }
      }
     
      setShowData(month_data);
    }
   

      
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
              {showData.map((item, index) => (
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
          <div  className="showMore">
            {numData > 5 ?
              <a onClick={() => handleShowLess()}>
                  Hide..
              </a>:
              null
            }
            <a onClick={() => handleShowMore()}>
              ...Show More
            </a>
          </div>
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
          
        
         
        {/* Button for week */ }
        <Button variant="success" onClick={() => showWeek(data)}>
          Show Week
        </Button>
       
        {/* Button for month */}
        <Button variant="success" onClick={() => showMonth(data)}>
          Show Month
        </Button>
       
        {/* Button for year */}
        <Button variant="success" onClick={() => showYear(data)}>
          Show Year
        </Button>
         
          
        
        <select>
          <option variant="success" onClick={() => showWeek(data)}> Show Week</option>
          <option variant="success" onClick={() => showMonth(data)}> Show Month</option>
          <option variant="success" onClick={() => showYear(data)}> Show Year</option>
        </select>
        
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