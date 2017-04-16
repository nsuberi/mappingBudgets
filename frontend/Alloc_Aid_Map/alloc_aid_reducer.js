import {
	FETCH_MAP
} from './alloc_aid_actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
	case FETCH_MAP:
		return action.payload.data;
	default:
		return state;
	}
}
