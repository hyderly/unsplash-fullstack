import React from 'react';
import {Link} from 'react-router-dom';

import "./Header.styles.css"


const Header = () => {
    return(
        <div className="navbar">
            <h2 className="navbar-logo">
                <Link to="/">
                    Authentication <br/>
                    BoilerPlate  
                </Link>
            </h2> 

            <ul className="navbar-links">
                <li className="navbar-link">
                    <Link to="/profile">Profile</Link>
                </li>
                <li className="navbar-link">
                    <Link to="/register">Register</Link>
                </li>
                <li className="navbar-link">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </div>
    )
}


export default Header;