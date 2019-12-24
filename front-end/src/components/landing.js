import React, { Component } from "react";
import "./styles.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="nav">
          <h1 className="logo">Tapt.</h1>
        </div>
        <div className="hero-wrapper">
          <h2 className="call">
            Cyber-crime damages will cost the world $6 trillion annually by 2021
            <span className="blink">_</span>
          </h2>
          <br />
          <h4 className="font-weight-light">
            How secure are your conversations?
          </h4>
          <br />
          <div className="signup-button" id="signup_button">
            <NavLink to="/auth" className="link-to-login">
              Sign-up | Log-in
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
