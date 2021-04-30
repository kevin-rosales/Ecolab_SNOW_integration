import React, { Component } from "react";

class SearchBar extends Component {
  state = { term: "" };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.term);
    console.log("PROPS!!", this.props);
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div>
            <div
              className="input-group mb-3"
              style={{ margin: "0 auto", paddingTop: "20px", width: "50vw" }}
            >
              <input
                className="form-control"
                placeholder={this.props.placeholder}
                type="text"
                value={this.state.term}
                onChange={(e) => this.setState({ term: e.target.value })}
                required
              />
              <button
                className="btn btn-primary"
                style={{ marginLeft: "5px" }}
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
