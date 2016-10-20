import axios from 'axios';

export const FETCH_ITEMS = 'FETCH_ITEMS';
//export const SELECT_SITE_ID = 'SELECT_SITE_ID';
/*
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_ITEM = 'ADD_ITEM'
*/

export function fetchItems() {
	//const request = axios.get('/returnGeoJSON');

	return {
		type: FETCH_ITEMS,
		payload: request
	};
}
