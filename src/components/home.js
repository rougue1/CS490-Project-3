import React ,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function Home()
{
    useEffect(() => {
        fetch("/home").then(
            res => console.log(res)
        )
    }, []);
    return <div></div>
}