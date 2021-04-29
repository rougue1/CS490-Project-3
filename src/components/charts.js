/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';

export function Charts()
<<<<<<< HEAD
{
    const [chartData, setChartData] = useState([[], []]);

    function getData() {
      fetch("/chartInfo")
        .then((res) => res.json())
        .then((val) => {
          console.log("Transactions:", val.transactions);
          setChartData(val);
        });
    }

=======
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
      
>>>>>>> 47bbdc12016df752c30cc5117d7256e1c0fc39a4
    useEffect(()=>{
        getData();
    },[]);
    
<<<<<<< HEAD
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Rainfall',
          data: [65, 59, 80, 81, 56, 55, 40],
=======
    const state = {
      labels: labeExpense[0],
      datasets: [
        {
          label: 'Expense',
>>>>>>> 47bbdc12016df752c30cc5117d7256e1c0fc39a4
          backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
<<<<<<< HEAD
          borderWidth: 1
=======
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
>>>>>>> 47bbdc12016df752c30cc5117d7256e1c0fc39a4
        }
      ]
    }
    
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
        
      },
    };
    
    

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
<<<<<<< HEAD
                data={data}
=======
                data={state}
>>>>>>> 47bbdc12016df752c30cc5117d7256e1c0fc39a4
                height={400}
                width={600}
                options={config}
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