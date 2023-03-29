import React from 'react';
import Navbar from '../../shared/Navbar';

const Dashboard = () => {
    const storedData = JSON.parse(localStorage.getItem("auth"));
    const user = storedData.user;
    
    return (
        <div>
            <Navbar/>
            dashboard
        </div>
    );
};

export default Dashboard;