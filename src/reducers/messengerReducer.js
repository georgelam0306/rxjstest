export default function(
  state = {
    messages: {}
  },
  action
) {
  switch (action.type) {
    case "RECEIVE_MESSAGE_LIST":
      return { ...state, messages: { ...action.payload } };
    case "ADD_MESSAGE": {
      const messages = { ...state.messages };
      messages[action.payload.id] = action.payload;
      return { ...state, messages };
    }

    case "REMOVE_MESSAGE": {
      const messages = { ...state.messages };
      delete messages[action.payload.id];
      return { ...state, messages };
    }
    default:
      return state;
  }
}
