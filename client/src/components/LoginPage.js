import React, { Component } from "react";
import axios from "axios";

class LoginPage extends Component {
  state = {
    creds: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    const enteredCreds = { ...this.state.creds };
    enteredCreds[e.target.name] = e.target.value;
    this.setState({ creds: enteredCreds });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("hit!");
    const payload = {
      username: this.state.creds.username,
      password: this.state.creds.password,
    };

    axios.post("/snow/auth", payload).then((res) => {
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <h1>Login Page </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Username: </label>
              <input onChange={this.handleChange} type="text" name="username" />
              <br />
            </div>

            <div>
              <label>Password: </label>
              <input
                onChange={this.handleChange}
                type="password"
                name="password"
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
