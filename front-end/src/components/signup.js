import React, { Component } from "react";
import axios from "axios";
const baseURL = "http://localhost:3006";

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      fullname: "",
      email: "",
      password: "",
      hasAgreed: false
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
    const response = await axios
      .post(`${baseURL}/user/register`, {
        fullname: this.state.fullname,
        password: this.state.password,
        email: this.state.email,
        hasAgreed: this.state.hasAgreed
      })
      .then(response => {
        this.props.history.push("/sign-in");
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      fullname: "",
      email: "",
      password: "",
      hasAgreed: false
    });
  }
  render() {
    return (
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="FormField__Input"
              placeholder="Enter your full name"
              name="fullname"
              value={this.state.fullname}
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
            <label className="FormField__CheckboxLabel">
              <input
                className="FormField__Checkbox"
                type="checkbox"
                name="hasAgreed"
                value={this.state.hasAgreed}
                onChange={this.handleChange}
              />
              I agree all statements in
              <a
                href="#"
                className="Formfield__TermsLink"
                style={{ color: "white", padding: "5px" }}
              >
                <span className="terms_and_conditions">terms of service</span>
              </a>
            </label>
          </div>

          <div className="FormField">
            <button
              className="FormField__Button mr-20"
              onChange={this.handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
