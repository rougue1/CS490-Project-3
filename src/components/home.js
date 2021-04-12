import React ,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ListBuilder from '@bit/lekanmedia.shared-ui.list-builder';

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
            // <table>
            //     {data.map((item, index) => {
            //         return (
            //           <tr>
            //             <th>{item.amount}</th>
            //             <th>{item.location}</th>
            //             <th>{item.date}</th>
            //           </tr>
            //         );
            //     })}
            // </table>
            <ListBuilder
    			headers={['Name', 'Alerts', 'Count', 'Call']}
    			rows={[
    				['Pep Guardiola', 'Invoice', 87, 5],
    				[{ text: 'Zenedine Zidane', src: 'https://fireflies.ai/assets/images/FFicon.svg' }, 'Pricing', 7, 15],
    				[{ text: 'Alex Fergusson', src: 'https://fireflies.ai/assets/images/FFicon.svg' }, 'Invites', 18, 50],
    				[{ text: 'Jose Mourinho', src: 'https://fireflies.ai/assets/images/FFicon.svg' }, 'Upgrade', 0, 1],
    			]}
		    />
            
            )}
        </div>
    );
}
