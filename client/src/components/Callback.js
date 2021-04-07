import React, { Component } from "react";

class Callback extends Component {
  state = {
    authStatus: null,
  };
  
  componentDidMount = () => {
    let params = this.props.location.search;
    console.log(params);
    if (params.indexOf("code") <= 0) {
      this.setState({
        authStatus: "Login Failed!",
      });
    } else {
      this.setState({
        authStatus: "Login Successful!",
      });
    }
  };
  
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">{this.state.authStatus}</h1>
          <hr className="my-4" />
          <p>
            {" "}
            This window will close in 5 seconds, or click the 'Close' button
            below.
          </p>
          <p className="lead">
            <button className="btn btn-primary">Close</button>
          </p>
        </div>
      </div>
    );
  }
}

export default Callback;
