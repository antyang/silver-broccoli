import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import { queryReducer } from "./app/reducers/reducers.js";
import { QueryContainer } from "./app/components/Query.js";

const Main = React.createClass({
  render () {
    return (
      <div>
				<QueryContainer />
      </div>
    )
  }
});

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware
)(createStore)


ReactDOM.render(
	<Provider store={createStoreWithMiddleware(queryReducer)}>
		<Main />
	</Provider>,
	document.getElementById("example")
);
