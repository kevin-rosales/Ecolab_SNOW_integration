import React, { Component } from "react";
import SearchBar from "./SearchBar";

class SearchKnowledge extends Component {
  state = {
    articles: [
      {
        id: 1,
        title:
          "Managing Settings in Internet Explorer 10 for Windows 8",
        num: "KB0000012",
        assignmentGroup: "Sales- IT",
        knowledgeBase: "IT",
        snippet:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus tempore vitae laboriosam doloremque in hic alias assumenda numquam, et, maxime maiores animi a ipsum ad id ratione aperiam delectus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae quidem modi mollitia ipsam animi, ad nihil iste illo maxime eum dolore qui a, repellat pariatur alias reiciendis aut dignissimos eveniet.",
      },
      {
        id: 2,
        title:
          "How to configure VPN for Apple Devices",
        num: "KB0000012",
        assignmentGroup: "Sales- IT",
        knowledgeBase: "IT",
        snippet:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus tempore vitae laboriosam doloremque in hic alias assumenda numquam, et, maxime maiores animi a ipsum ad id ratione aperiam delectus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae quidem modi mollitia ipsam animi, ad nihil iste illo maxime eum dolore qui a, repellat pariatur alias reiciendis aut dignissimos eveniet.",
      },
      {
        id: 3,
        title:
          "Can I upgrade my operating system? What are the system requirements?",
        num: "KB0000012",
        assignmentGroup: "Sales- IT",
        knowledgeBase: "IT",
        snippet:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus tempore vitae laboriosam doloremque in hic alias assumenda numquam, et, maxime maiores animi a ipsum ad id ratione aperiam delectus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae quidem modi mollitia ipsam animi, ad nihil iste illo maxime eum dolore qui a, repellat pariatur alias reiciendis aut dignissimos eveniet.",
      },
    ],
  };
  onSearchSubmit = (term) => {
    console.log("Knowledge!!!", term);
  };

  render() {
    const resultList = this.state.articles.map((res) => (
      <div style={{ margin: "10px" }} key={res.id}>
        <div style={{textAlign: "left"}} className="card">
            <div className="card-body">
              <h5 className="card-title">{res.title}</h5>
              <h6 className="card-subtitle mb-1 text-muted">Number: {res.num} | Knowledge Base: {res.knowledgeBase} | Assignment Group: {res.assignmentGroup}  </h6>
              <br/>
              <p className="card-text"> <strong>Summary:</strong> {res.snippet}</p>
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
