import {
	FETCH_ITEMS
} from './tsp_actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
	case FETCH_ITEMS:
		return action.payload.data;
	default:
		return state;
	}
}
