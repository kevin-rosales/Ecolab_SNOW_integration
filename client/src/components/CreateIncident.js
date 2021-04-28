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
    boostrapMsg: null,
    errBlock: null,
    resultMsg: null,
  };

  handleChange = (e) => {
    const newIncident = { ...this.state.incident };
    newIncident[e.target.name] = e.target.value;
    this.setState({ incident: newIncident });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      caller_id: this.state.incident.caller_id,
      category: this.state.incident.category,
      subcategory: this.state.incident.subcategory,
      priority: this.state.incident.priority,
      short_description: this.state.incident.short_description,
      assigned_to: this.state.incident.assigned_to,
      assignment_group: this.state.incident.assignment_group,
      description: this.state.incident.description
    };

    axios
      .post("/snow/incident", payload)
      .then((res) => {
        const incidentNumber = res.data.responseData.result.number;
        this.setState({
          resultMsg: `Incident Created Successfully - Incident Number: ${incidentNumber}`,
          boostrapMsg: "alert alert-success alert-dismissible fade show",
          errBlock: false,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          resultMsg: `Incident Creation Failed`,
          boostrapMsg: "alert alert-danger alert-dismissible fade show",
          errBlock: true,
        });
      });
  };

  render() {
    return (
      <div>
        <h1>Create Incident</h1>
        {this.state.errBlock !== null ? (
          <div className={this.state.boostrapMsg} role="alert">
            {this.state.resultMsg}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null}

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
