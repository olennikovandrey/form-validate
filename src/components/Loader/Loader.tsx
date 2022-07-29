import "./loader.sass"
import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
}
