import React, { useState, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';

export function Charts()
{   
    const [chartData, setChartData] = useState([[], []]);
    
     function getData() {
        fetch("/chartInfo")
          .then((res) => res.json())
          .then((val) => {
            console.log(val);
            console.log(val[0]);
            console.log(val[1]);
            setChartData(val);
          });
      }
      
    useEffect(()=>{
        getData();
        
    },[]);
    
    const state = {
      labels: chartData[0],
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            'red',
            '#C9DE00',


          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',

          ],
          data: chartData[1],
        }
      ]
    }
    
    return (
        <div>
            <h1>Charts</h1>
            <Doughnut
                data={state}
                height={400}
                width={600}
            />
        </div>
    );
}



export default Charts;