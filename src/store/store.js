import reducers from "../reducers";
import epics from "../epics";
import firebase from "firebase";
import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";

const config = {
  apiKey: "AIzaSyBg0zUbF4pnJLymmXN6JiaDtwv19lcvfE0",
  authDomain: "rxjstest-97bfa.firebaseapp.com",
  databaseURL: "https://rxjstest-97bfa.firebaseio.com",
  projectId: "rxjstest-97bfa",
  storageBucket: "rxjstest-97bfa.appspot.com",
  messagingSenderId: "930549860702"
};

try {
  require("firebase/firestore");
  firebase.initializeApp(config);
} catch (e) {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(epics);
const reduxStore = composeEnhancers(applyMiddleware(epicMiddleware))(
  createStore
)(reducers);

export default function configureStore() {
  return {
    store: reduxStore
  };
}
