import React, { Component } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";

class SearchUser extends Component {
  state = {
    results: [],
  };

  onSearchSubmit = async (term) => {
    console.log("User Search Term: ", term);
    const payload = {
      searchterm: term,
    };

    const resp = await axios.post("/snow/searchUser", payload);
    console.log(resp.data.result);
    this.setState({ results: resp.data.result });
  };

  render() {
    const resultList = this.state.results.map((res) => (
      <tbody key={res.sys_id}>
        <tr>
          <td>{res.name}</td>
          <td>{res.title}</td>
          <td>division Example{/* {res.u_division} */}</td>
          <td>manager Example{/* {res.manager} */}</td>
          <td>example Location{/* {res.location} */}</td>
          <td>{res.mobile_phone}</td>
          <td>{res.email}</td>
        </tr>
      </tbody>
    ));
    return (
      <div>
        <SearchBar onSubmit={this.onSearchSubmit} placeholder="Search User" />
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="thead">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Title</th>
                <th scope="col">Division</th>
                <th scope="col">Manager</th>
                <th scope="col">Location</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            {resultList}
          </table>
        </div>
      </div>
    );
  }
}

export default SearchUser;
