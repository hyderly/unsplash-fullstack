import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Header.styles.css";

import { userLogoutAction } from "../../redux/user/user.actions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logout = () => {
    dispatch(userLogoutAction());
  };

  return (
    <div className="navbar">
      <h2 className="navbar-logo">
        <Link to="/">
          Authentication <br />
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
        {userInfo ? (
          <li className="navbar-link" onClick={logout}>
            Logout ({userInfo.name})
          </li>
        ) : (
          <li className="navbar-link">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
