import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Verify from "./components/Verify/Verify";
import Forgot from "./components/Forgot/Forgot";
import ResetPassword from "./components/Reset/Reset";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register} />
        <Route path="/verify/:verifyToken" component={Verify} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/resetpassword/:resetToken" component={ResetPassword} />
      </Switch>
    </div>
  );
}

export default App;
