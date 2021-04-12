import React ,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function Home()
{
    const [ data, setData ] = useState([]);
    
    useEffect(() => {
        fetch("/home").then(
            res => res.json()
        ).then(data => {
            setData(data);
        })
    }, []);
    
    console.log(data.length);
    
    return (
        <div className="transaction">
            {data.length === 0 ? (
                <b>No transactions to show</b>
            ):(
            <table>
                {data.map((item, index) => {
                    return (
                      <tr>
                        <th>{item.amount}</th>
                        <th>{item.location}</th>
                        <th>{item.date}</th>
                      </tr>
                    );
                })}
            </table>
            )}
        </div>
    );
}