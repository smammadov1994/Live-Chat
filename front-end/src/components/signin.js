import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:3006";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post(`${baseURL}/user/login`, {
      email: this.state.email,
      password: this.state.password
    });
    localStorage.setItem("usertoken", response.data);

    this.props.history.push("/user/profile");
    this.state.email === "admin@gmail.com"
      ? this.props.history.push("/admin/profile")
      : this.props.history.push("/user/profile");

    this.setState({
      email: "",
      password: ""
    });
  }

  componentWillUnmount() {
    console.log("UNMOUNTING SIGNIN");
  }

  render() {
    return (
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="FormField__Input"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="FormField__Input"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20">Sign In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignInForm);
