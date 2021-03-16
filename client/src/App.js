import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

class App extends Component {
  /*
  Added the Agent Workspace Widget SDK Functionality to grab data from the Agent workspace for SNOW Widget on the componentDidMount
  */
  componentDidMount() {
    const win = window.location.pathname;
    console.log(win);
    const onSuccess = (data) => {
      console.log("onSuccess", data);
    };

    const onError = (err) => {
      console.log("Error", err);
    };

    window.lpTag.agentSDK.init();
    window.lpTag.agentSDK.bind("visitorInfo", onSuccess, onError);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route path="/" component={LoginPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
