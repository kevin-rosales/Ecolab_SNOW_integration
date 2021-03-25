import React, { Component } from "react";
import SearchBar from "./SearchBar";

class SearchUser extends Component {
  onSearchSubmit = (term) => {
    console.log("HIT!!!", term);
  };

  render() {
    return (
      <div>
        <h1>Search User</h1>
        <SearchBar onSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}

export default SearchUser;
