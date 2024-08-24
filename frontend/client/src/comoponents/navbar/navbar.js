 import React, { useContext, useState } from 'react';
import "./navbar.css";
import { Assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';

export const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
const navigate = useNavigate();
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
       navigate("/")
    };

    return (
        <div className='navbar'>
            <Link to="/">
                <img src={Assets.logo} alt="Logo" className='logo' />
            </Link>
            <ul className='navbar-menu'>
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
            </ul>
            <div className='navbar-right'>
                <img src={Assets.search} alt="Search" className='navbar-search-icon' />
                <Link to="/cart">
                    <img src={Assets.cart} alt="Cart" />
                    <div className='dot'></div>
                </Link>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={Assets.profile} alt="Profile" />
                        <ul className='nav-profile-dropdown'>
                            
                            <li onClick={handleLogout}>
                                <img src={Assets.logout} alt="Logout" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
