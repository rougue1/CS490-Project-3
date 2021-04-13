import React ,{ useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import '../App.css';
import { View } from './view.js';
=======
import ListBuilder from '@bit/lekanmedia.shared-ui.list-builder';
>>>>>>> fc64396c21f62e7f282f6a90b8aec912ab138dbe

export function Home()
{
    const [ data, setData ] = useState([]);
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
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
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Location</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                 console.log(item)
                 return(
                    <tr onClick={() => setShow(true)}>
                        <div style={{display:"none"}} onClick={e => e.stopPropagation()}>
                            <View  list={item} show={show} onHide={handleClose} />
                        </div>
                      <td>{item.amount}</td>
                      <td>{item.location}</td>
                      <td>{item.date}</td>
                    </tr>
                );
                })}
                
              
              </tbody>
            </table>
            
            )}
        </div>
    );
}
