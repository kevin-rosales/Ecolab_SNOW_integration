import React, { Component } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

class SearchIncident extends Component {
  onSearchSubmit = (term) => {
    console.log("Incident!!!", term);
  };

  render() {
    return (
      <div>
        <NavBar />
        <SearchBar
          onSubmit={this.onSearchSubmit}
          placeholder="Search Incident"
        />
      </div>
    );
  }
}

export default SearchIncident;
