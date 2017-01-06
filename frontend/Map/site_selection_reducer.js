import {
	SELECT_SITE_ID
} from './geojson_actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
	case SELECT_SITE_ID:
		return action.payload;
	default:
		return state;
	}
}
