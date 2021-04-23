import React, { Component } from "react";
import axios from "axios";

class Callback extends Component {
  state = {
    authStatus: null,
  };

  componentDidMount = async () => {
    let params = this.props.location.search;
    console.log(params);

    if (params.indexOf("code") <= 0) {
      this.setState({
        authStatus: "Login Failed!",
      });
    } else {
      const splitParam = params.split("=", 2);
      const auth_code = splitParam[1].split("&");
      // console.log(auth_code[0]);

      let payload = {
        authCode: auth_code[0],
      };

      const resp = await axios.post("/snow/auth", payload);
      // console.log(resp.data)
      let { access_token } = resp.data;
      console.log(access_token);
      sessionStorage.clear();
      sessionStorage.setItem("token", access_token);

      let token = sessionStorage.getItem("token");
      console.log(token);

      if (token !== null || token !== undefined) {
        this.setState({
          authStatus: "Login Successful !",
        });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">{this.state.authStatus}</h1>
          <hr className="my-4" />
          <p> To close this window click on the 'Close' button below.</p>
          <p className="lead">
            <button
              onClick={() => {
                window.close();
              }}
              className="btn btn-primary"
            >
              Close
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Callback;
