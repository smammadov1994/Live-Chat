import React, { Component } from "react";
import "../App.css";
import SignUpForm from "./signup";
import SignInForm from "./signin";

class FrontLogin extends Component {
  constructor() {
    super();
    this.state = {
      renderSignIn: true
    };
    this.switchStateSignUp = this.switchStateSignUp.bind(this);
    this.switchStateSignIn = this.switchStateSignIn.bind(this);
  }

  switchStateSignIn() {
    this.setState({
      renderSignIn: true
    });
  }
  switchStateSignUp() {
    this.setState({
      renderSignIn: false
    });
  }

  render() {
    return (
      <div>
        <div className="Frontapp">
          <div className="App__Aside" refs="stars"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
              <div
                to="/sign-in"
                className="PageSwitcher__Item"
                activeClassName="PageSwitcher__Item--Active"
                onClick={this.switchStateSignIn}
              >
                Sign In
              </div>
              <div
                exact
                to="/sign-up"
                className="PageSwitcher__Item"
                activeClassName="PageSwitcher__Item--Active"
                onClick={this.switchStateSignUp}
              >
                Sign Up
              </div>
            </div>
            <div className="FormTitle"></div>
            {this.state.renderSignIn ? <SignInForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
    );
  }
}

export default FrontLogin;
