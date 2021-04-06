import React, { Component } from "react";
import SearchBar from "./SearchBar";

class SearchIncident extends Component {
  state = {
    Incidents: [
      {
        id: 1,
        num: "INC0000015",
        user: "Kevin Rosales",
        created: "2020-06-10 23:38:46",
        des:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas reiciendis quae, id sapiente ipsam ad nulla neque porro aliquam nemo, eaque cupiditate modi quis, doloribus labore fugiat nam maiores fuga.",
      },
      {
        id: 2,
        num: "INC0000015",
        user: "Kevin Rosales",
        created: "2020-06-10 23:38:46",
        des:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas reiciendis quae, id sapiente ipsam ad nulla neque porro aliquam nemo, eaque cupiditate modi quis, doloribus labore fugiat nam maiores fuga.",
      },
      {
        id: 3,
        num: "INC0000015",
        user: "Kevin Rosales",
        created: "2020-06-10 23:38:46",
        des:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas reiciendis quae, id sapiente ipsam ad nulla neque porro aliquam nemo, eaque cupiditate modi quis, doloribus labore fugiat nam maiores fuga.",
      },
    ],
  };
  onSearchSubmit = (term) => {
    console.log("Incident!!!", term);
  };

  render() {
    const resultList = this.state.Incidents.map((res) => (
      <div style={{ margin: "10px" }} key={res.id}>
        <div style={{ textAlign: "left" }} className="card">
          <div className="card-body">
            <h5 className="card-title">{res.num}</h5>
            <h6 className="card-subtitle mb-1 text-muted">
              User: {res.user} | Created Date: {res.created}{" "}
            </h6>
            <br/>
            <p className="card-text">
              {" "}
              <strong>Description:</strong> {res.des}
            </p>
          </div>
        </div>
      </div>
    ));
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
