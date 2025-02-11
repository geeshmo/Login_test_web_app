import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../actions";

import Error from "../error";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    existing: "hey",
    error: false,
    errorMsg: "",
    errorClass: "",
    inputClass: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = e => {
    e.preventDefault();
    const { username, email, password, passwordConfirm, existing } = this.state;

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      this.missingFields();
    } else if (password.length < 6 || password !== passwordConfirm) {
      this.matchPassword();
    } else if (existing === username) {
      this.userExist();
    } else {
      const newUser = {
        username: username,
        email: email,
        password: password
      };

      this.registerSuccess();
      this.clearInputs();
      this.props.addUser(newUser);
      //this.props.history.push("/login");
    }
  };

  missingFields = () => {
    this.errorStateFields();

    this.setState({
      error: true,
      errorMsg: "Please fill out all fields!",
      errorClass: "is-danger"
    });
    setTimeout(
      () => this.setState({ error: false, errorMsg: "", errorClass: "" }),
      4000
    );
  };

  matchPassword = () => {
    this.setState({
      error: true,
      errorMsg:
        "Please make sure the password is atleast 6 characters and match the confirmation!",
      errorClass: "is-danger"
    });
    setTimeout(
      () => this.setState({ error: false, errorMsg: "", errorClass: "" }),
      4000
    );
  };

  userExist = () => {
    document.getElementById("userName").classList = "input is-danger";

    this.setState({
      error: true,
      errorMsg: "Username already exists!",
      errorClass: "is-danger"
    });
    setTimeout(
      () => this.setState({ error: false, errorMsg: "", errorClass: "" }),
      4000
    );
  };

  registerSuccess = () => {
    this.setState({
      error: true,
      errorMsg: `Success! Thank you for signing up ${this.state.username}!`,
      errorClass: "is-success"
    });
    setTimeout(
      () => this.setState({ error: false, errorMsg: "", errorClass: "" }),
      4000
    );
  };

  clearInputs = () => {
    this.setState({
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    });
  };

  errorStateFields = () => {
    const { username, email, password, passwordConfirm } = this.state;

    if (username === "") {
      document.getElementById("userName").classList = "input is-danger";
    } else {
      document.getElementById("userName").classList = "input is-success";
    }
    if (email === "") {
      document.getElementById("email").classList = "input is-danger";
    } else {
      document.getElementById("email").classList = "input is-success";
    }
    if (password === "") {
      document.getElementById("password").classList = "input is-danger";
    } else {
      document.getElementById("password").classList = "input is-success";
    }
    if (passwordConfirm === "") {
      document.getElementById("passwordConfirm").classList = "input is-danger";
    } else {
      document.getElementById("passwordConfirm").classList = "input is-success";
    }
  };

  render() {
    const {
      errorMsg,
      errorClass,
      username,
      email,
      password,
      passwordConfirm,
      inputClass
    } = this.state;

    this.props.userExist.map(e => console.log(e.username));

    return (
      <div className="container">
        {this.state.error ? (
          <Error classType={errorClass} message={errorMsg} />
        ) : (
          ""
        )}
        <form className="section">
          <h1 className="title is-1">Register</h1>
          <div className="field">
            <label className="label">User Name:</label>
            <input
              id="userName"
              onChange={this.handleChange}
              name="username"
              type="text"
              className="input"
              placeholder="Enter a username.."
              value={username}
            />
          </div>
          <div className="field">
            <label className="label">Email:</label>
            <input
              id="email"
              onChange={this.handleChange}
              name="email"
              type="email"
              className={"input" + inputClass}
              placeholder="Enter an email.."
              value={email}
            />
          </div>
          <div className="field">
            <label className="label">Password:</label>
            <input
              id="password"
              onChange={this.handleChange}
              name="password"
              type="password"
              className={"input" + inputClass}
              placeholder="Enter a password.."
              value={password}
            />
          </div>
          <div className="field">
            <label className="label">Confirm Password:</label>
            <input
              id="passwordConfirm"
              onChange={this.handleChange}
              name="passwordConfirm"
              type="password"
              className={"input" + inputClass}
              placeholder="Confirm password.."
              value={passwordConfirm}
            />
          </div>
          <div className="field">
            <button onClick={this.handleRegister} className="button is-primary">
              Register
            </button>
          </div>
          <div className="field">
            <p>
              Already have an account? click <Link to="/login">here</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userExist: state.user.storedUsers
});

export default connect(
  mapStateToProps,
  { addUser }
)(Register);
