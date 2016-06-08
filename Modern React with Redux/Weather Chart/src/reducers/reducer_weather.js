import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action) {
	console.log('Action received', action);
	switch (action.type) {
		case FETCH_WEATHER:
		// return state.concat([action.payload.data]);
		return [action.payload.data, ...state];
		// the ... flattens the array out for us -
		// nearly identical to line 7
	}
	console.log('Action', action)
	return state;
}
