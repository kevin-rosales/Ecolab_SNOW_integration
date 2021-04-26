import React, { Component } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
class SearchKnowledge extends Component {
  state = {
    articles: [],
    ownershipGroup: "",
  };

  onSearchSubmit = async (term) => {
    let token = localStorage.getItem("token");
    console.log("Knowledge Search Term: ", term);
    const payload = {
      searchterm: term,
      token: token
    };

    const resp = await axios.post("/snow/searchKnowledge", payload);
    console.log("DATA!!", resp.data.returnedData);
    const returnedData = resp.data.returnedData;

    let results = [];

    returnedData.forEach((obj) => {
      obj.ResponseData["ownershipGroup"] = obj.ownershipGroup;
      results.push(obj.ResponseData);
    });

    this.setState({
      articles: results,
    });
  };

  render() {
    const resultList = this.state.articles.map((res) => {
      return (
        <div style={{ margin: "10px" }} key={res.id}>
          <div style={{ textAlign: "left" }} className="card">
            <h5 className="card-header">{res.title}</h5>
            <div className="card-body">
              <h6 className="card-subtitle mb-1 text-muted">
                Number: {res.meta.number} | Knowledge Base:{" "}
                {res.meta.knowledgeBase} | Ownership Group: {res.ownershipGroup}{" "}
              </h6>
              <br />
              <p className="card-text">
                {" "}
                <strong>Summary:</strong> {res.snippet}
              </p>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <SearchBar
          onSubmit={this.onSearchSubmit}
          placeholder="Search Knowledge"
        />
        {resultList}
      </div>
    );
  }
}

export default SearchKnowledge;
