import {
	FETCH_BUDGET_ITEMS
} from './budget_actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
	case FETCH_BUDGET_ITEMS:
		let data = action.payload.data;
		data = data.map(item => {
			if(item.ispriority){
				item.ispriority = "yes"
			} else {
				item.ispriority = "no"
			}
			return item
		})
		return data;
	default:
		return state;
	}
}
