export default function pingEpic(action$) {
  return action$
    .ofType("PING")
    .delay(1000) // Asynchronously wait 1000ms then continue
    .map(action => {
      console.log("pinged 3");
      return action;
    })
    .mapTo({ type: "PONG" });
}
