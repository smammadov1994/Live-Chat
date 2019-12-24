import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Dashboard from "./dashboard.js";
import "./profile.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Store from "./Store.js";
const baseURL = "http://localhost:3006";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      email: "",
      errors: {}
    };
    this.logOut = this.logOut.bind(this);
  }

  async getProfile(e) {
    const response = await axios
      .get(`${baseURL}/user/profile`, {})
      .then(response => {
        console.log("hello");
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    console.log("PROFILE IS RENDERED");
    this.getProfile();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      fullname: decoded.fullname,
      email: decoded.email
    });
  }
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/auth`);
  }

  render() {
    return (
      <div>
        <div className="nav-bar">
          <div className="nav-logo">Tapt.</div>
          <div className="logout" onClick={this.logOut}>
            Logout
          </div>
        </div>
        <div className="container-profile">
          <Store>
            <Dashboard username={this.state.fullname} />
          </Store>
        </div>
      </div>
    );
  }
}

export default Profile;
