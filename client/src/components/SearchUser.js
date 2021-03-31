import React, { Component } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

class SearchUser extends Component {
  onSearchSubmit = (term) => {
    console.log("HIT!!!", term);
  };

  render() {
    return (
      <div>
        <NavBar />
        <SearchBar onSubmit={this.onSearchSubmit} placeholder="Search User" />
      </div>
    );
  }
}

export default SearchUser;
