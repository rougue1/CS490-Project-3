/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';

export function Charts()
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

    useEffect(()=>{
        getData();
    },[]);
    
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Rainfall',
          data: [65, 59, 80, 81, 56, 55, 40],
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
          borderWidth: 1
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
            <h1>Charts</h1>
            <Bar
                data={data}
                height={400}
                width={600}
                options={config}
            />
        </div>
    );
}



export default Charts;