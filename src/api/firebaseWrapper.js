import firebase from "firebase";
import { Observable } from "rxjs";

export function AddChatMessage(message: string, name: string, timestamp) {
  console.log(message, name);
  return firebase
    .firestore()
    .collection("messages")
    .add({
      timestamp,
      name,
      message
    });
}

export function GetLastMessages(count) {
  return firebase
    .firestore()
    .collection("messages")
    .orderBy("timestamp", "desc")
    .limit(count)
    .get();
}

export function ListenChatMessages(startAfter) {
  return Observable.create(obs => {
    firebase
      .firestore()
      .collection("messages")
      .orderBy("timestamp", "asc")
      .startAfter(startAfter || null)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges.forEach(change => {
          if (change.type === "added" || change.type === "modified") {
            const message = {
              type: "change",
              data: {
                id: change.doc.id,
                ...change.doc.data()
              }
            };
            obs.next(message);
          }
          if (change.type === "removed") {
            const message = {
              type: "remove",
              data: {
                id: change.doc.id
              }
            };
            obs.next(message);
          }
        });
      });
  });
}
