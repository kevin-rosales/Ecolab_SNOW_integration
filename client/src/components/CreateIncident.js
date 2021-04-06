import React, { Component } from "react";

class CreateIncident extends Component {
  state = {
    incident: {
      caller_id: "",
      category: "",
      subcategory: "",
      priority: "",
      short_description: "",
      assigned_to: "",
      assignment_group: "",
      description: "",
    },
  };

  handleChange = (e) => {
    const newIncident = { ...this.state.incident };
    newIncident[e.target.name] = e.target.value;
    this.setState({ incident: newIncident });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.incident);
    this.props.history.push("/incident");
  };

  render() {
    return (
      <div>
        <h1>Create Incident</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="caller_id">
              Caller
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.incident.caller_id}
              type="text"
              name="caller_id"
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="category">
              Category
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.incident.category}
              type="text"
              name="category"
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="subcategory">
              SubCategory
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.incident.subcategory}
              type="text"
              name="subcategory"
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="priority">
              Priority
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.incident.priority}
              type="text"
              name="priority"
            />
          </div>
          <div className="form-group row">
            <label
              className="col-sm-4 col-form-label"
              htmlFor="short_description"
            >
              Short Description
            </label>
            <textarea
              style={{ width: "50vw" }}
              onChange={this.handleChange}
              value={this.state.incident.short_description}
              type="text"
              name="short_description"
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="assigned_to">
              Assignment
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.incident.assigned_to}
              type="text"
              name="assigned_to"
            />
          </div>
          <div className="form-group row">
            <label
              className="col-sm-4 col-form-label"
              htmlFor="assignment_group"
            >
              Group
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.incident.assignment_group}
              type="text"
              name="assignment_group"
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="description">
              Description
            </label>
            <textarea
              style={{ width: "50vw" }}
              onChange={this.handleChange}
              value={this.state.incident.description}
              type="text"
              name="description"
            />
          </div>
          <button className="btn btn-primary">Create Incident</button>
        </form>
      </div>
    );
  }
}

export default CreateIncident;
