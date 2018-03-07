import React, { Component } from "react";
import { connect } from "react-redux";

@connect()
export default class ChatMessage extends Component {
  render() {
    const { message } = this.props;
    return <div>{message.message}</div>;
  }
}
