import React ,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function Home()
{
    useEffect(() => {
        fetch("/home").then(
            res => res.json()
        ).then(data => {
            console.log(data)
        }).catch(err => {
            console.log("something went wrong...");
        })
    }, []);
    
    return <div></div>
}