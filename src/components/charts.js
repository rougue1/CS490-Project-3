/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Bar, Line } from 'react-chartjs-2';
import "../styles/charts.css";

export function Charts()
{   
    const [chartData, setChartData] = useState([[], [], [], [], [], [], [], []]);
    const [filterOptions, setFilterOptions] = useState("Year");
    const [labelIncome, setIncome] = useState([[],[]]);
    const [labeExpense, setExpense] = useState([[],[]]);
    
    const [ lineLableIncome, setLineLableIncome ] = useState([[], [], []]);
    const [ lineDataIncome, setLineDataIncome ] = useState([[], [], []]);
    const [ lineLableExpense, setLineLableExpense ] = useState([[], [], []]);
    const [ lineDataExpense, setLineDataExpense ] = useState([[], [], []]);
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
            setChartData(val[0]);
            setExpense([val[0][0],val[0][1]]);
            setIncome([val[0][2],val[0][3]]);

            setLineLableExpense([val[1].line[0].days.labels, val[1].line[0].month.labels, val[1].line[0].year.labels]);
            setLineDataExpense([val[1].line[0].days.data, val[1].line[0].month.data, val[1].line[0].year.data]);

            setLineLableIncome([val[1].line[1].days.labels, val[1].line[1].month.labels, val[1].line[1].year.labels]);
            setLineDataIncome([val[1].line[1].days.data, val[1].line[1].month.data, val[1].line[1].year.data]);
          });
      }
      
    useEffect(()=>{
        getData();
        
    },[]);
    
    // console.log(lineLableExpense[0]);
    // console.log(lineDataExpense[0]);
    // console.log(lineLableIncome);
    // console.log(lineDataIncome);
    
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
    const line_Expense = {
        labels: lineLableExpense[0],
        datasets: [{
          label: 'Spent',
          data: lineDataExpense[0],
          fill: false,
          borderColor: '#ff7171',
          tension: 0.1
        }]
    }
    const line_Income = {
      labels: lineLableIncome[0],
        datasets: [{
          label: 'Earned',
          data: lineDataIncome[0],
          fill: false,
          borderColor: '#98ddca',
          tension: 0.1
        }]
    }
    return (
        <div className="chartsBody">
          <div className="sectionWrap">
            <section>
              <select
                  value={filterOptions}
                  onChange={(e) => {
                    handleFilter(e);
                    setFilterOptions(e.target.value);
                  }}>
                  <option value="Year"> Show Year</option>
                  <option value="Month"> Show Month</option>
              </select>
              <div className="barChartWrap">
                <div className="chart-wrap">
                  <Bar
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                    data={state}
                  />
                </div>
                <div className="chart-wrap">
                  <Bar
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                    data={stateIncome}
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="lineChartWrap">
                <div className="chart-wrap">
                  <Line
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                    data={line_Expense}
                  />
                </div>  
                <div className="chart-wrap">
                  <Line
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                    data={line_Income}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
    );
}



export default Charts;