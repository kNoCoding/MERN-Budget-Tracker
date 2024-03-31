import React from 'react';
import { useNavigate } from 'react-router-dom';

const FooterNav = () => {
    const navigate = useNavigate();
    const active = 'dashboard'; // Dynamically set this based on the current path

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        // Clear the token or user data from storage or global state
        localStorage.removeItem('token');
        // Navigate to the login page
        navigate('/');
        // Additionally, you might want to clear global state or do other cleanup tasks here
    };

    return (
        <footer className="footer-nav">
            <button className="nav-button" onClick={() => handleNavigation('/dashboard')}>🏠</button>
            <button className="nav-button" disabled>❔</button>
            <button className="nav-button" onClick={() => handleNavigation('/expense-form')}>➕</button>
            <button className="nav-button" disabled>❔</button>
            <button className="nav-button" disabled>❔</button>
        </footer>
    );
};

export default FooterNav;