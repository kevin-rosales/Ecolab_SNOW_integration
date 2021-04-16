import axios from "axios";
import React, { Component } from "react";
import SearchBar from "./SearchBar";

class SearchIncident extends Component {
  state = {
    Incidents: [],
  };

  onSearchSubmit = async (term) => {
    console.log("Incident Search Term: ", term);
    const payload = {
      searchterm: term,
    };

    const resp = await axios
      .post("/snow/searchIncident", payload)
      .catch((err) => {
        console.log("Search Incident Failed - ", err);
      });

    if (resp == undefined) {
      this.setState({ Incidents: [{ id: 1, Noresult: "No Results" }] });
    } else {
      this.setState({ Incidents: resp.data.result });
    }
  };

  render() {
    const resultList = this.state.Incidents.map((res) => {
      if (!res.Noresult) {
        return (
          <div style={{ margin: "10px" }} key={res.number}>
            <div style={{ textAlign: "left" }} className="card">
              <div className="card-body">
                <h5 className="card-title">{res.number}</h5>
                <h6 className="card-subtitle mb-1 text-muted">
                  User: {res.caller_id.value} | Created Date: {res.opened_at}{" "}
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
