import testEpic from "./testEpic";
import chatEpic from "./chatEpic";
import { combineEpics } from "redux-observable";

export default combineEpics(testEpic, chatEpic);
