import axios from 'axios';

export const FETCH_MAP = 'FETCH_MAP';

export function fetchMap() {
	const request = axios.get('/returnMap');

	return {
		type: FETCH_MAP,
		payload: request
	};
};
