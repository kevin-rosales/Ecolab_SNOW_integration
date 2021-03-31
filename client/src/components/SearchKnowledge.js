import React, { Component } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

class SearchKnowledge extends Component {
  onSearchSubmit = (term) => {
    console.log("Knowledge!!!", term);
  };

  render() {
    return (
      <div>
        <NavBar />
        <SearchBar
          onSubmit={this.onSearchSubmit}
          placeholder="Search Knowledge"
        />
      </div>
    );
  }
}

export default SearchKnowledge;
