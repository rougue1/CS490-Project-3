/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver'; 

export function Charts()
{   
    const [chartData, setChartData] = useState([[], [], [], [], [], [], [], []]);
    const [filterOptions, setFilterOptions] = useState("Year");
    const [labelIncome, setIncome] = useState([[],[]]);
    const [labeExpense, setExpense] = useState([[],[]]);
    const chartRef = useRef(null);
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
    
    const loaded = () => {
        
        console.log("done loading the images")
        const base64Image = chartRef.current.chartInstance.toBase64Image();
        console.log(base64Image);
        alert(base64Image);
        return base64Image;
        
        
    }
    
    
    const option = {
       animation: {
          onComplete: loaded
        }
    }
    
   const saveCanvas= () =>{
       //save to png
       const canvasSave = document.getElementById('stackD');
       canvasSave.toBlob(function (blob) {
           saveAs(blob, "testing.png")
       })
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
                id="stackD"
                height={400}
                width={600}
                ref={chartRef}
                
            />
            <a onClick={saveCanvas}> Download </a>
            <Bar
                data={stateIncome}
                height={400}
                width={600}
            />
            
        </div>
    );
}



export default Charts;