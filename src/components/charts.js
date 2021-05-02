/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Bar, Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver'; 
import "../styles/charts.css";
import { Download } from "react-bootstrap-icons";

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
            // console.log(val[0]);
            
            setExpense([val[0][0],val[0][4],val[0][8]]);
            setDataExpense([val[0][1],val[0][5],val[0][9]]);
            
            setIncome([val[0][2],val[0][6],val[0][10]]);
            setDataIncome([val[0][3],val[0][7],val[0][11]]);
            
            
            if(val[1].line[0].length !== 0)
            {
              setLineLableExpense([val[1].line[0].year.labels, val[1].line[0].month.labels, val[1].line[0].days.labels]);
              setLineDataExpense([val[1].line[0].year.data, val[1].line[0].month.data, val[1].line[0].days.data]);
            }
            if(val[1].line[1].length !== 0)
            {
              setLineLableIncome([val[1].line[1].year.labels, val[1].line[1].month.labels, val[1].line[1].days.labels]);
              setLineDataIncome([val[1].line[1].year.data, val[1].line[1].month.data, val[1].line[1].days.data]);
            }
          });
      }
      
    useEffect(()=>{
        getData();

        
    },[]);
    
    const downloadImage = (chartId) => {
      console.log("The the charid "+ chartId);
      const canvasSave = document.getElementById(chartId);
      const context = canvasSave.getContext('2d');
      context.save();
      context.globalCompositeOperation = 'destination-over';
      context.fillStyle = "white";
      context.fillRect(0, 0, canvasSave.width, canvasSave.height);

      canvasSave.toBlob(function (blob) {
         saveAs(blob,  chartId+".png")
      })
      
      context.restore();
      
    }
    
    
    // console.log(dataIncome);
    console.log(lineDataIncome);
    console.log(lineLableIncome);
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
          data: dataIncome[chartData],
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
                  <div className="barChart1">
                    <div className="chart-wrap">
                      <Bar
                        id="bar-expense"
                        options={{
                          responsive: true,
                          maintainAspectRatio: false
                        }}
                        data={state}
                      />
                    </div>
                    <div className="bar-expense-wrap">
                      <Download id="bar-expense-download" onClick={()=>downloadImage("bar-expense")} />
                    </div>
                  </div>
                  <div className="barChart1">
                    <div className="chart-wrap">
                      <Bar
                        id="bar-income"
                        options={{
                          responsive: true,
                          maintainAspectRatio: false
                        }}
                        data={stateIncome}
                      />
                    </div>
                    <div className="bar-income-wrap">
                      <Download id="bar-income-download" onClick={()=>downloadImage("bar-income")} />
                   </div>
                  </div>
                </div>
            </section>
            <section>
              <div className="lineChartWrap">
                <div className="barChart1">
                  <div className="chart-wrap">
                    <Line
                      id="line-expense"
                      options={{
                        responsive: true,
                        maintainAspectRatio: false
                      }}
                      data={line_Expense}
                    />
                  </div>
                  <div className="line-expense-wrap">
                    <Download id="line-expense-download" onClick={()=>downloadImage("line-expense")}/>
                  </div>
                </div>
                <div className="barChart1">
                  <div className="chart-wrap">
                    <Line
                      id="line-income"
                      options={{
                        responsive: true,
                        maintainAspectRatio: false
                      }}
                      data={line_Income}
                    />
                  </div>
                  <div className="line-income-wrap">
                    <Download id="line-income-download" onClick={()=>downloadImage("line-income")}/>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
    );
}



export default Charts;