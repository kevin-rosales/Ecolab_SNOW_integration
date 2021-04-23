import React, { Component } from "react";

class LoginPage extends Component {
  handleCLick = (e) => {
    e.preventDefault();
    window.open(
      "https://ecolabqa.service-now.com/oauth_auth.do?response_type=code&redirect_uri=https://quiet-everglades-59480.herokuapp.com/callback&client_id=0d18a00317aba4d424afc79f43a1effa&state=snow"
    );
  };

  render() {
    return (
      <div id="Mspage">
        <h1>Sign in </h1>
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
