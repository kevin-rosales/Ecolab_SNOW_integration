import axios from "axios";
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
    const payload = {
      caller_id: this.state.caller_id,
      category: this.state.category,
      subcategory: this.state.subcategory,
      priority: this.state.priority,
      short_description: this.state.short_description,
      assigned_to: this.state.assigned_to,
      assignment_group: this.state.assignment_group,
      description: this.state.description,
    };

    axios.post("/snow/incident", payload).then((res) => {
      console.log(res);
      this.props.history.push("/incident");
    });
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
            {/* <input
              onChange={this.handleChange}
              value={this.state.incident.category}
              type="text"
              name="category"
            /> */}
            <select
              onChange={this.handleChange}
              value={this.state.incident.category}
              type="text"
              name="category"
              id="inputState"
            >
              <option defaultValue>Choose...</option>
              <option>Customer Hardware</option>
              <option>Mobile Services</option>
              <option>IT Central Services</option>
              <option>Account Services</option>
              <option>Network/ Connectivity</option>
              <option>Software</option>
              <option>Cyber Security Incidents</option>
            </select>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="subcategory">
              SubCategory
            </label>
            {/* <input
              onChange={this.handleChange}
              value={this.state.incident.subcategory}
              type="text"
              name="subcategory"
            /> */}
            <select
              onChange={this.handleChange}
              value={this.state.incident.subcategory}
              type="text"
              name="subcategory"
              id="inputState"
            >
              <option defaultValue>Choose...</option>
              <option>Bot Activity</option>
              <option>Compromised Account</option>
              <option>Data Loss Prevention</option>
              <option>DDoS Attack</option>
              <option>DLP Incident Review</option>
              <option>Executive Security Threat</option>
              <option>Financial Fraud</option>
              <option>IR Team</option>
              <option>Log Request</option>
              <option>Phishing Exploit Attempt</option>
              <option>Policy Violation</option>
              <option>Ransomware Outbreak</option>
              <option>Theft</option>
              <option>Unidentified Network Device</option>
            </select>
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
