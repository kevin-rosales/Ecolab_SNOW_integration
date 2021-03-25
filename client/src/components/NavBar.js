import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div id="navBar">
        <nav className="nav nav-tabs">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link
              id="searchUser"
              className="nav-item nav-link"
              data-toggle="tab"
              role="tab"
              to={"/user"}
            >
              Search User
            </Link>

            <Link
              id="createIncident"
              className="nav-item nav-link"
              data-toggle="tab"
              role="tab"
              to={"/create"}
            >
              Create Incident
            </Link>

            <Link
              id="searchIncident"
              className="nav-item nav-link "
              data-toggle="tab"
              role="tab"
              to={"/incident"}
            >
              Search Incidents
            </Link>

            <Link
              id="searchKnowledge"
              className="nav-item nav-link"
              data-toggle="tab"
              role="tab"
              to={"/knowledge"}
            >
              Search Knowledge
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
