import React, { Component } from "react";
import { connect } from "react-redux";
import ChatMessengerList from "./ChatMessengerList";

function mapStateToProps(state) {
  return {
    messages: state.messenger.messages
  };
}

@connect(mapStateToProps)
export default class ChatMessenger extends Component {
  state = {
    text: ""
  };

  componentDidMount() {
    this.props.dispatch({
      type: "LISTEN_CHAT"
    });
  }

  onChangeInput = e => {
    this.setState({
      text: e.target.value
    });
  };

  onSubmit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "START_ADD_CHAT_MESSAGE",
      payload: {
        timestamp: Date.now(),
        message: this.state.text,
        name: "nobody"
      }
    });
    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <div>
        <ChatMessengerList />
        <input value={this.state.text} onChange={this.onChangeInput} />
        <button onClick={this.onSubmit}>submit</button>
      </div>
    );
  }
}
