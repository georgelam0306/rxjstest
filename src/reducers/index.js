import { combineReducers } from "redux";
import testReducer from "./testReducer";
import messengerReducer from "./messengerReducer";

export default combineReducers({
  testReducer,
  messenger: messengerReducer
});
