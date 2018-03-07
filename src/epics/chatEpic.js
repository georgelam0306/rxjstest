import {
  AddChatMessage,
  ListenChatMessages,
  GetLastMessages
} from "../api/firebaseWrapper";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import _ from "lodash";

function chatEpic(action$) {
  return action$
    .ofType("START_ADD_CHAT_MESSAGE")
    .flatMap(action => {
      return AddChatMessage(
        action.payload.message,
        action.payload.name,
        action.payload.timestamp
      );
    })
    .map(result => {
      return { type: "FINISHED_ADD_CHAT_MESSAGE", payload: result };
    });
}

function chatListenerEpic(action$) {
  return action$
    .ofType("LISTEN_CHAT")
    .flatMap(action => {
      return GetLastMessages(10);
    })
    .flatMap(snapshot => {
      const messages = {};
      const reversedMessages = _.reverse(snapshot.docs);
      reversedMessages.forEach(doc => {
        messages[doc.id] = { id: doc.id, ...doc.data() };
      });

      return Observable.of({
        type: "RECEIVE_MESSAGE_LIST",
        payload: messages
      }).concat(
        ListenChatMessages(reversedMessages[reversedMessages.length - 1]).map(
          result => {
            if (result.type === "change") {
              return { type: "ADD_MESSAGE", payload: result.data };
            } else {
              return { type: "REMOVE_MESSAGE", payload: result.data };
            }
          }
        )
      );
    });
}

export default combineEpics(chatEpic, chatListenerEpic);
