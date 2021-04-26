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
import axios from "axios";
import * as localStorageService from "./components/LocalStorageService";

class App extends Component {
  state = {
    visitorName: "",
  };

  /*
  Added the Agent Workspace Widget SDK Functionality to grab data from the Agent workspace for SNOW Widget on the componentDidMount
  */
  componentDidMount() {
    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        const token = localStorageService.getAccessToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    //Add a response interceptor

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        const originalRequest = error.config;
        console.log(error);
        if (
          error.response.status === 401 &&
          originalRequest.url ===
            "https://ecolabqa.service-now.com/oauth_token.do"
        ) {
          this.props.history.go("/login");
          return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorageService.getRefreshToken();
          return axios
            .post("/snow/refresh", {
              refresh_token: refreshToken,
            })
            .then((res) => {
              if (res.status === 201) {
                localStorageService.setToken(res.data);
                axios.defaults.headers.common["Authorization"] =
                  "Bearer " + localStorageService.getAccessToken();
                return axios(originalRequest);
              }
            });
        }
        return Promise.reject(error);
      }
    );

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
              <Route
                exact
                path="/user"
                render={(props) => (
                  <SearchUser {...props} visitorName={this.state.visitorName} />
                )}
              />
              <Route path="/" component={LoginPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
