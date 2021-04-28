import React, { Component } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";

class SearchUser extends Component {
  state = {
    results: [],
    division: "",
    location: "",
    manager: "",
    phoneNum: "",
    enterTerm: "",
  };

  componentDidMount() {
    console.log(this.props);
    this.setState({ phoneNum: this.props.visitorName });
    console.log("phoneNum", this.state.phoneNum);
  }

  onSearchSubmit = async (term) => {
    console.log("User Search Term: ", term);
    if (term === "") {
      this.setState({ enterTerm: "Please enter a search term" });
    } else {
      const payload = {
        searchterm: term,
      };

      const resp = await axios.post("/snow/searchUser", payload);
      console.log("ResponseData", resp.data.ResponseData.result);
      console.log("ResponseData", resp.data);
      this.setState({
        results: resp.data.ResponseData.result,
        division: resp.data.division,
        location: resp.data.location,
        manager: resp.data.manager,
      });
    }
  };

  render() {
    const resultList = this.state.results.map((res) => (
      <tbody key={res.sys_id}>
        <tr>
          <td>{res.name}</td>
          <td>{res.title}</td>
          <td>{this.state.division}</td>
          <td>{this.state.manager}</td>
          <td>{this.state.location}</td>
          <td>{res.mobile_phone}</td>
          <td>{res.email}</td>
        </tr>
      </tbody>
    ));
    return (
      <div>
        <SearchBar
          onSubmit={this.onSearchSubmit}
          phoneNum={this.state.phoneNum}
          placeholder="Search User"
        />
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
            {this.state.enterTerm}
      </div>
    );
  }
}

export default SearchUser;
