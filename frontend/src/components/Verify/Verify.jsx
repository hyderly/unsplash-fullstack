import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./verify.styles.css";

import { verifyUserAction } from "../../redux/user/user.actions";
import Loader from "../Loader/Loader";

const Verify = ({ match }) => {
  const disaptch = useDispatch();
  const verifyUser = useSelector(state => state.userVerify);
  const { loading, success, error } = verifyUser;

  console.log(match.params.verifyToken);

  useEffect(() => {
    disaptch(verifyUserAction(match.params.verifyToken));
  }, [match.params.verifyToken]);

  return (
    <div className="form-box">
      {loading ? (
        <Loader />
      ) : success ? (
        <div className="user">
          <h2>Yayy !!</h2>
          <p>Your Are Verified</p>
          <Link to="/login">Login Now</Link>
        </div>
      ) : (
        <div className="user">
          <h2>O No !!</h2>
          <p>There is Some problem</p>
          <Link to="/contact-us">Contact us</Link>
        </div>
      )}
    </div>
  );
};

export default Verify;
