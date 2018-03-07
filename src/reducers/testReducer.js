export default function(
  state = {
    isPinging: false,
    persistentState: 1
  },
  action
) {
  switch (action.type) {
    case "PING":
      return { ...state, isPinging: true };
    case "PONG":
      return {
        ...state,
        isPinging: false,
        persistentState: state.persistentState + 1
      };
    default:
      return state;
  }
}
