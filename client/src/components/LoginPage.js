import React, { Component } from "react";

class LoginPage extends Component {
  handleCLick = (e) => {
    e.preventDefault();
    window.open(
      "https://login.microsoftonline.com/c1eb5112-7946-4c9d-bc57-40040cfe3a91/oauth2/v2.0/authorize?response_type=token&state=&client_id=6b68ef85-288b-4ef5-8019-b494be7a206e&scope=user_impersonation&redirect_uri=https://quiet-everglades-59480.herokuapp.com/callback&response_mode=query"
    );
  };

  render() {
    return (
      <div id="Mspage">
        <h1>Login Page </h1>
        <div>
          <button
            className="btn btn-primary"
            onClick={this.handleCLick}
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
