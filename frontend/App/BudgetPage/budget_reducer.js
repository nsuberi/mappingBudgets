import {
	FETCH_BUDGET_ITEMS
} from './budget_actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
	case FETCH_BUDGET_ITEMS:
		return action.payload.data;
	default:
		return state;
	}
}
