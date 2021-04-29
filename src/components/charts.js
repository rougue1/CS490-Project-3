/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';

export function Charts()
{   
    const [chartData, setChartData] = useState([[], [], [], [], [], [], [], []]);
    const [filterOptions, setFilterOptions] = useState("Year");
    const [labelIncome, setIncome] = useState([[],[]]);
    const [labeExpense, setExpense] = useState([[],[]]);
    /*
        Expense Year
      0: labels
      1: values
      
        Income Year
      2: labels
      3: values
      
        Expense Month
      4: labels
      5: values
      
        Income Month
      6: labels
      7: values
     */
    
      function handleFilter(e) {
         if (e.target.value === "Month") {
          /*indices 4-7*/
          setExpense([chartData[4],chartData[5]]);
          setIncome([chartData[6],chartData[7]]);
          
        } else if (e.target.value === "Year") {
          /*indice 0-3*/
          setExpense([chartData[0],chartData[1]]);
          setIncome([chartData[2],chartData[3]]);
          
        } else{
            setExpense([chartData[0],chartData[1]]);
            setIncome([chartData[2],chartData[3]]);
        }
      }
    
    
  
     function getData() {
        fetch("/chartInfo")
          .then((res) => res.json())
          .then((val) => {
            console.log(val);
            console.log(val[0]);
            console.log(val[1]);
            setChartData(val);
            setExpense([val[0],val[1]]);
            setIncome([val[2],val[3]]);

          });
      }
      
    useEffect(()=>{
        getData();
        
    },[]);
    
    const state = {
      labels: labeExpense[0],
      datasets: [
        {
          label: 'Expense',
          backgroundColor: [
            '#98ddca',
            '#d5ecc2',
            '#ffd3b4',
            '#ffaaa7',
            '#eca3f5', 
            '#fdbaf8', 
            '#b0efeb', 
            '#edffa9'

          ],
          hoverBackgroundColor: [
          '#98ddca',
          '#d5ecc2',
          '#ffd3b4',
          '#ffaaa7',
          '#eca3f5', 
          '#fdbaf8', 
          '#b0efeb', 
          '#edffa9'

          ],
          hoverOffset: 5,
          data: labeExpense[1],
        }
      ]
    }
    const stateIncome = {
      labels: labelIncome[0],
      datasets: [
        {
          label: 'Income',
          backgroundColor: [
            '#98ddca',
            '#d5ecc2',
            '#ffd3b4',
            '#ffaaa7',
            '#eca3f5', 
            '#fdbaf8', 
            '#b0efeb', 
            '#edffa9'

          ],
          hoverBackgroundColor: [
          '#98ddca',
          '#d5ecc2',
          '#ffd3b4',
          '#ffaaa7',
          '#eca3f5', 
          '#fdbaf8', 
          '#b0efeb', 
          '#edffa9'

          ],
          hoverOffset: 5,
          data: labelIncome[1],
        }
      ]
    }
    
    return (
        <div>
          <select
              value={filterOptions}
              onChange={(e) => {
                handleFilter(e);
                setFilterOptions(e.target.value);
              }}>
              <option value="Year"> Show Year</option>
              <option value="Month"> Show Month</option>
          </select>
            <h1>Charts</h1>
            <Bar
                data={state}
                height={400}
                width={600}
            />
            <Bar
                data={stateIncome}
                height={400}
                width={600}
            />
            
        </div>
    );
}



export default Charts;