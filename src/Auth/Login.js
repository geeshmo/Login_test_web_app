import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../actions";

import Error from "../error";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: false,
    errorMsg: "",
    errorClass: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { storedUser } = this.props;
    const { username, password } = this.state;

    function checkUser(e) {
      return e.username === username && e.password === password;
    }
    if (storedUser.find(checkUser)) {
      this.props.setUser(true);
      this.props.history.push("/boxes");
    } else {
      this.failedLogin();
    }

    e.preventDefault();
  };

  failedLogin = () => {
    this.handleInputs();
    this.setState({
      error: true,
      errorClass: "is-danger",
      errorMsg: "Username and Password does not match",
    });
    setTimeout(() => {
      this.setState({
        error: false,
        errorClass: "",
        errorMsg: "",
      });
    }, 4000);
  };

  handleInputs = () => {
    document.getElementById("userNameLogin").classList = "input is-danger";
    document.getElementById("passwordLogin").classList = "input is-danger";

    setTimeout(() => {
      document.getElementById("userNameLogin").classList = "input";
      document.getElementById("passwordLogin").classList = "input";
    }, 4000);
  };

  render() {
    const { errorMsg, errorClass } = this.state;

    return (
      <div className="container">
        {this.state.error ? (
          <Error classType={errorClass} message={errorMsg} />
        ) : (
          ""
        )}
        <form className="section">
          <h1 className="title is-1">Login</h1>
          <div className="field">
            <label className="label">User Name:</label>
            <input
              id="userNameLogin"
              onChange={this.handleChange}
              name="username"
              type="text"
              className="input"
              placeholder="Enter a username.."
            />
          </div>
          <div className="field">
            <label className="label">Password:</label>
            <input
              id="passwordLogin"
              onChange={this.handleChange}
              name="password"
              type="password"
              className="input"
              placeholder="Enter a password.."
            />
          </div>
          <div className="field">
            <button onClick={this.handleSubmit} className="button is-primary">
              Login
            </button>
          </div>
          <div className="field">
            <p>
              Dont have an account? click <Link to="/register">here</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedUser: state.user.storedUsers,
});

export default connect(mapStateToProps, { setUser })(Login);
