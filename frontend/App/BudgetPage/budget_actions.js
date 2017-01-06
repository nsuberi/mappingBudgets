import axios from 'axios';

export const FETCH_BUDGET_ITEMS = 'FETCH_BUDGET_ITEMS';

export function fetchBudgetItems() {
	const request = axios.get('/returnBudgetItems');

	return {
		type: FETCH_BUDGET_ITEMS,
		payload: request
	};
}
