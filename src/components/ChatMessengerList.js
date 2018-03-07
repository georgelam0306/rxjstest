import React, { Component } from "react";
import { connect } from "react-redux";
import ChatMessage from "./ChatMessage";
import _ from "lodash";

function mapStateToProps(state) {
  return {
    messages: state.messenger.messages
  };
}

@connect(mapStateToProps)
export default class ChatMessengerList extends Component {
  render() {
    const { messages } = this.props;
    if (!_.size(messages)) {
      return <div>No Messages Found</div>;
    }

    const renderedMessages = _.map(messages, (message, i) => {
      return <ChatMessage key={i} message={message} />;
    });
    return <div>{renderedMessages || "No Messages"}</div>;
  }
}
