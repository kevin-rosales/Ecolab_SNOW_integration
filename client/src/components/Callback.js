import React, { Component } from "react";

class Callback extends Component {
    componentDidMount=()=>{
        let params = this.props.location.search
        console.log(params)
    }
  render() {
    return <div></div>;
  }
}

export default Callback;
