import React, { Component } from "react";
import SearchBar from "./SearchBar";

class SearchUser extends Component {
  state = {
    results: [
      {
        id: "1",
        pop: "Bob Marley",
        sock: "Full Stack Developer ETS TEAM ",
        phone: "+1 (123) 894-4561",
        email: "krosales@liveperson",
        location: "USA, NC",
        manager: "Kevin Rosales",
        department: "IT",
      },
      {
        id: "2",
        pop: "Kevin Costner",
        sock: "Junior Full Stack Developer",
        phone: "+1 (123) 894-4561",
        email: "test@liveperson",
        location: "USA, GA",
        manager: "Bob Sting",
        department: "IT",
      },
      {
        id: "3",
        pop: "John Lopez",
        sock: "Principal",
        phone: "+1 (123) 894-4561",
        email: "email@liveperson",
        location: "USA, FL",
        manager: "Legion of Doom",
        department: "IT",
      },
      {
        id: "4",
        pop: "Jose Ortiz",
        sock: "Solutions Engineer",
        phone: "+1 (123) 894-4561",
        email: "krosales@liveperson",
        location: "USA, LA",
        manager: "Avengers",
        department: "IT",
      },
      {
        id: "5",
        pop: "Peter Parker",
        sock: "Director of ETS Deployment",
        phone: "+1 (123) 894-4561",
        email: "krosales@liveperson",
        location: "USA, CA",
        manager: "LP",
        department: "IT",
      },
    ],
  };

  onSearchSubmit = (term) => {
    console.log("HIT!!!", term);
  };
  render() {
    // DO A TABLE!!!!!

    const resultList = this.state.results.map((res) => (
      <tbody key={res.id}>
        <tr>
          <td>{res.pop}</td>
          <td>{res.sock}</td>
          <td>{res.department}</td>
          <td>{res.manager}</td>
          <td>{res.location}</td>
          <td>{res.phone}</td>
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
