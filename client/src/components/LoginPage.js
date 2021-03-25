import React, { Component } from "react";
import axios from "axios";

class LoginPage extends Component {
  state = {
    creds: {
      username: "",
      password: "",
    },
    access_token: "",
  };

  handleChange = (e) => {
    const enteredCreds = { ...this.state.creds };
    enteredCreds[e.target.name] = e.target.value;
    this.setState({ creds: enteredCreds });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: this.state.creds.username,
      password: this.state.creds.password,
    };

    axios
      .post("/snow/auth", payload)
      .then((res) => {
        const { access_token } = res.data;
        this.setState({ access_token: access_token });
        this.props.history.push("/user");
      })
      .catch((e) => {
        console.log("error", e);
        if (e.message.indexOf("status code 401") > 0) {
          console.log("Access Denied");
        } else {
          console.log("Error with login");
        }
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
