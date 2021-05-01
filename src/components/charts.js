/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Bar, Line } from 'react-chartjs-2';
import "../styles/charts.css";

export function Charts()
{   
    const [chartData, setChartData ] = useState(0);
    const [filterOptions, setFilterOptions] = useState("Year");
  
    const [labelIncome, setIncome] = useState([[],[], []]);
    const [dataIncome, setDataIncome] = useState([[],[], []]);
    const [labeExpense, setExpense] = useState([[],[], []]);
    const [dataExpense, setDataExpense] = useState([[],[], []]);
    
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
         if (e.target.value === "Year") {
          /*indices 4-7*/
          setChartData(0);
          // setExpense([chartData[4],chartData[5]]);
          // setIncome([chartData[6],chartData[7]]);
          
        } else if (e.target.value === "Month") {
          /*indice 0-3*/
          setChartData(1);
          
        } else if (e.target.value === "Week") {
          setChartData(2);
        } else {
          setChartData(0);
        }
      }

  
     function getData() {
        fetch("/chartInfo")
          .then((res) => res.json())
          .then((val) => {
            // setChartData(val[0]);
            // console.log(Object.keys(val[1].line[0]).length);
            
            setExpense([val[0][0],val[0][4],val[0][8]]);
            setDataExpense([val[0][1],val[0][5],val[0][9]]);
            
            setIncome([val[0][2],val[0][6],val[0][10]]);
            setDataIncome([val[0][3],val[0][7],val[0][11]]);
            
            if(val[1].line[0].length !== 0)
            {
              setLineLableExpense([val[1].line[0].year.labels, val[1].line[0].month.labels, val[1].line[0].days.labels]);
              setLineDataExpense([val[1].line[0].year.data, val[1].line[0].month.data, val[1].line[0].days.data]);
            }
            else if(val[1].line[1].length !== 0)
            {
              setLineLableIncome([val[1].line[1].year.labels, val[1].line[1].month.labels, val[1].line[1].days.labels]);
              setLineDataIncome([val[1].line[1].year.data, val[1].line[1].month.data, val[1].line[1].days.data]);
            }
          });
      }
      
    useEffect(()=>{
        getData();
        
    },[]);
    console.log()
    const state = {
      labels: labeExpense[chartData],
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
          data: dataExpense[chartData],
        }
      ]
    }
    const stateIncome = {
      labels: labelIncome[chartData],
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
          data: dataExpense[chartData],
        }
      ]
    }
    const line_Expense = {
        labels: lineLableExpense[chartData],
        datasets: [{
          label: 'Spent',
          data: lineDataExpense[chartData],
          fill: false,
          borderColor: '#ff7171',
          tension: 0.1
        }]
    }
    const line_Income = {
      labels: lineLableIncome[chartData],
        datasets: [{
          label: 'Earned',
          data: lineDataIncome[chartData],
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
                  <option value="Week"> Show Week</option>
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