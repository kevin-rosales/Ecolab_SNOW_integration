import React, { Component } from "react";
import * as localStorageService from "./LocalStorageService";

class LoginPage extends Component {
  state = {
    login: "",
    tokenMissing: null,
  };

  componentDidMount() {
    const tokens = localStorageService.getAccessToken();
    console.log(tokens);
    if (tokens === null || tokens === undefined) {
      this.setState({ login: "Sign In", tokenMissing: true });
    } else {
      window.location.href = "/user";
    }
  }

  handleCLick = (e) => {
    e.preventDefault();
    window.open(
      "https://ecolabqa.service-now.com/oauth_auth.do?response_type=code&redirect_uri=https://quiet-everglades-59480.herokuapp.com/callback&client_id=0d18a00317aba4d424afc79f43a1effa&state=snow"
    );

    const tokens = localStorageService.getAccessToken();
    console.log(tokens);

    window.location.href = "/user";
  };

  render() {
    return (
      <div id="Mspage">
        <br />
        {this.state.tokenMissing === null ||
        this.state.tokenMissing === true ? (
          <h1>{this.state.login}</h1>
        ) : null}
        <hr />
        <div>
          <button
            className="btn btn-primary"
            onClick={this.handleCLick}
            type="submit"
          >
            Sign in to ServiceNow
          </button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
