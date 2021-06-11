import React from "react";

import "./alert.styles.css";

const Alert = ({ children, danger }) => {
  return <div className={danger ? "danger" : "sucsess"}>{children}</div>;
};

export default Alert;
