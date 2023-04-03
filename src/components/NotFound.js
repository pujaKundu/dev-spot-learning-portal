import React from 'react';
import img from '../image/404.jpg'

const NotFound = () => {
    return (
        <div>
            <img src={img} alt="Not found" />
        </div>
    );
};

export default NotFound;