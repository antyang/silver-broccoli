// create two actions to dispatch to our reducer,
// one for “STARTING_REQUEST”
// one for “FINISHED_REQUEST”

const startingRequest = () => {
  return {
    type: "STARTING_REQUEST"
  }
}
const finishedRequest = (response) => {
  return {
    type: "FINISHED_REQUEST",
    response: response
  }
}

export const getGraph = (payload) => {
  return dispatch => {
    dispatch(startingRequest());
    return new Promise(function(resolve, reject) {
      let request=new XMLHttpRequest();
      request.open("POST", "/graphql", true);
      request.setRequestHeader("Content-Type",
                               "application/graphql");
      request.send(payload);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText)
        }
      }
    }).then(response =>
            dispatch(finishedRequest(JSON.parse(response))))
  }
}

/**
 When getGraph() is called we dispatch startingRequest() to
 indicate the start of a new query.

 Then begin the async request ('application/graphql')

 When our query is complete we dispatch finishedRequest()
 with the result of query
*/
