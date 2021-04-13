import React ,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import '../App.css';


Modal.setAppElement("#root")
export function Home()
{
    const [ data, setData ] = useState([]);
    const [modal,setModal] = useState(false);
    
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
                    <tr onClick={() => setModal(true)}>
                        <div style={{display: "none"}} onClick={e => e.stopPropagation()}>
                            <Modal size="sm" isOpen={modal} onRequestClose={() => setModal(false)}>
                                <h3>Amount: {item.amount} </h3>
                                <h3>Date: {item.date}</h3>
                                <h3>Location: {item.location} </h3>
                                <h3>Description: {item.description} </h3>
                                <button onClick={() => setModal(false)}>Close</button>
                            </Modal>
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