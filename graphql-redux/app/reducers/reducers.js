import Immutable from "immutable";

const immutableState = Immutable.Map({
  fetching: false,          // middle of query, awaiting for response
  data: Immutable.Map({})   // contains response data
});

export const queryReducer = (state = immutableState, action) => {
  switch (action.type) {
    case "STARTING_REQUEST":
      return state.set("fetching", true);
    case "FINISHED_REQUEST":
      return state.set("fetching", false)
             .set("data", Immutable.Map(action.response.data.goldberg));
    default:
      return state
  }
}
