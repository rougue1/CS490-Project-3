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
   
    // Display Month transactions for this month commit 2
   
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
   
    // Display Month transactions for this year commit 4
   
    function showYear(data)
    {
      var year_data = [];
      for (var i = 0; i < data.length; i++)
      {
        const date = data[i].date.slice(5, 16);
        const year = date.slice(7, 11);
       
        const curr_date = new Date();
        const curr_year = curr_date.getFullYear().toString();
       
        if(curr_year === year)
        {
          year_data.push(data[i])
        }
      }
      setShowData(year_data);
    }
   
    // Display Month transactions for this week commit 6
   
    function showWeek(data)
    {
      var week_data = [];
      for (var i = 0; i < data.length; i++)
      {
        const today = new Date();
       
        var date = data[i].date.slice(5, 16);
        var day = date.slice(0, 2);
        var month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(date.slice(3, 6)) / 3;
        var year = date.slice(7, 11);
       
        var lastWeek_day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).getDay().toString();
        var lastWeek_month = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).getMonth().toString();
        var lastWeek_year = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).getFullYear().toString();
       
        var today_day = today.getDate().toString();
        var today_month = today.getMonth().toString();
        var today_year = today.getFullYear().toString();
       
        var D_1 = [lastWeek_day, lastWeek_month, lastWeek_year];
        var D_2 = [today_day, today_month, today_year];
        var D_3 = [day, month, year];
         
        var d1 = new Date(D_1[2], parseInt(D_1[1]), D_1[0]);
        var d2 = new Date(D_2[2], parseInt(D_2[1]), D_2[0]);
        var d3 = new Date(D_3[2], parseInt(D_3[1]), D_3[0]);
         
        if (d3 >= d1 && d3 <= d2) {
            week_data.push(data[i]);
        }
      }
      setShowData(week_data);
    }
    
      function favTutorial() {
        var mylist = document.getElementById("myList");
        document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
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
          
        {/* Button for week make a commit 5 */}
          <Button variant="success" onClick={() => showWeek(data)}>
            Show Week
          </Button>
         
          {/* Button for month make a commit 1 */}
          <Button variant="success" onClick={() => showMonth(data)}>
            Show Month
          </Button>
         
          {/* Button for year make a commit 3 */}
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