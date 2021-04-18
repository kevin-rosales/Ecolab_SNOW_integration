import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SearchUser from "./components/SearchUser";
import SearchIncident from "./components/SearchIncident";
import SearchKnowledge from "./components/SearchKnowledge";
import CreateIncident from "./components/CreateIncident";
import Callback from "./components/Callback";
import SingleUser from "./components/SingleUser";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    visitorName: "",
  };
  /*
  Added the Agent Workspace Widget SDK Functionality to grab data from the Agent workspace for SNOW Widget on the componentDidMount
  */
  componentDidMount() {
    const win = window.location.pathname;
    console.log(win);
    const onSuccess = (data) => {
      console.log("onSuccess", data.newValue.visitorName);
      const phone = data.newValue.visitorName;
      this.setState({ visitorName: phone });
    };

    const onError = (err) => {
      console.log("Error", err);
    };

    window.lpTag.agentSDK.init();
    window.lpTag.agentSDK.bind("visitorInfo", onSuccess, onError);
  }

  render() {
    const showNav =
      window.location.pathname !== "/" &&
      window.location.pathname !== "/callback" ? (
        <NavBar />
      ) : null;
    return (
      <div className="App">
        <Router>
          {showNav}
          <div>
            <Switch>
              <Route exact path="/callback" component={Callback} />
              <Route exact path="/knowledge" component={SearchKnowledge} />
              <Route exact path="/incident" component={SearchIncident} />
              <Route exact path="/create" component={CreateIncident} />
              <Route exact path="/user/:id" component={SingleUser} />
              <Route exact path="/user" visitorName={this.state.visitorName} component={SearchUser} />
              <Route path="/" component={LoginPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
