import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SearchUser from "./components/SearchUser";
import NavBar from "./components/NavBar";
import SearchIncident from "./components/SearchIncident";
import SearchKnowledge from "./components/SearchKnowledge";
import CreateIncident from "./components/CreateIncident";

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
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/knowledge" component={SearchKnowledge} />
              <Route exact path="/incident" component={SearchIncident} />
              <Route exact path="/create" component={CreateIncident} />
              <Route exact path="/user" component={SearchUser} />
              <Route path="/" component={LoginPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
