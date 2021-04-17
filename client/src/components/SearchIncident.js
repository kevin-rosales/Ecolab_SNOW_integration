import axios from "axios";
import React, { Component } from "react";
import SearchBar from "./SearchBar";

class SearchIncident extends Component {
  state = {
    Incidents: [],
    user: "",
  };

  onSearchSubmit = async (term) => {
    console.log("Incident Search Term: ", term);
    const payload = {
      searchterm: term,
    };

    // grab incident from SNOW api endpoint from server
    const resp = await axios
      .post("/snow/searchIncident", payload)
      .catch((err) => {
        console.log("Search Incident Failed - ", err);
      });

    // If there is no data returned then add No Results to page as message
    if (resp === undefined) {
      this.setState({ Incidents: [{ id: 1, Noresult: "No Results" }] });
    } else {
      this.setState({
        Incidents: resp.data.ResponseData.result,
        user: resp.data.user,
      });
    }
  };

  render() {
    const resultList = this.state.Incidents.map((res) => {
      if (!res.Noresult) {
        return (
          <div style={{ margin: "10px" }} key={res.number}>
            <div style={{ textAlign: "left" }} className="card">
              <h5 className="card-header">{res.number}</h5>
              <div className="card-body">
                <h6 className="card-subtitle mb-1 text-muted">
                  User: {this.state.user} | Created Date: {res.opened_at}{" "}
                </h6>
                <br />
                <p className="card-text">
                  {" "}
                  <strong>Description:</strong> {res.description}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={res.id}>
            <h4>No Results</h4>
          </div>
        );
      }
    });
    return (
      <div>
        <SearchBar
          onSubmit={this.onSearchSubmit}
          placeholder="Search Incident"
        />
        {resultList}
      </div>
    );
  }
}

export default SearchIncident;
