import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FooterNav = () => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)

    const handleNavigation = (path) => {
        navigate(path)
        setShowMenu(false)
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <footer className="footer-nav">
            <button className="nav-button" onClick={() => handleNavigation('/dashboard')}>🏠</button>
            <button className="nav-button" disabled>❔</button>
            <button className="nav-button" onClick={toggleMenu}>➕</button>
            <div className={showMenu ? "menu visible" : "menu"}>
                <button onClick={() => handleNavigation('/expense-form')}>Expense</button>
                <button onClick={() => handleNavigation('/income-form')}>Income</button>
                <button onClick={() => handleNavigation('/budget-form')}>Budget</button>
            </div>
            <button className="nav-button" disabled>❔</button>
            <button className="nav-button" disabled>❔</button>
        </footer>
    )
}


export default FooterNav