import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderNav = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear the token or user data from storage or global state
        localStorage.removeItem('token');
        // Navigate to the login page
        navigate('/');
        // Additionally, you might want to clear global state or do other cleanup tasks here
    };

    return (
        <header className="header-nav">
            <h1>Money Tracker</h1>
            <button className="nav-button" onClick={handleLogout}>
                🚪🏃‍♀️💨
            </button>
        </header>
    );
};

export default HeaderNav;