import React, { Component } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
class SearchKnowledge extends Component {
  state = {
    articles: [],
  };

  onSearchSubmit = async (term) => {
    console.log("Knowledge Search Term: ", term);
    const payload = {
      searchterm: term,
    };

    const resp = await axios.post("/snow/searchKnowledge", payload);
    console.log(resp.data.result.results);
    this.setState({ articles: resp.data.result.results });
  };

  render() {
    const resultList = this.state.articles.map((res) => (
      <div style={{ margin: "10px" }} key={res.id}>
        <div style={{ textAlign: "left" }} className="card">
          <h5 className="card-header">{res.title}</h5>
          <div className="card-body">
            <h6 className="card-subtitle mb-1 text-muted">
              Number: {res.meta.number} | Knowledge Base:{" "}
              {res.meta.knowledgeBase} | Assignment Group:{" "}
              {res.meta.assignmentGroup}{" "}
            </h6>
            <br />
            <p className="card-text">
              {" "}
              <strong>Summary:</strong>  {res.snippet}
            </p>
          </div>
        </div>
      </div>
    ));
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
