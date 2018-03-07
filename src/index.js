import React, { Component } from "react";
import { render } from "react-dom";
import ChatMessenger from "./components/ChatMessenger";

import "./styles/main.css";
import { Observable, map } from "rxjs";
import Store from "./store/store";
import { Provider } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React2"
    };
  }

  render() {
    return (
      <Provider store={Store().store}>
        <div>
          <ChatMessenger />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
