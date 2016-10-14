import { combineReducers } from 'redux';
import GeoJsonReducer from './geojson_reducer'

const rootReducer = combineReducers({
	geojson: GeoJsonReducer
});

export default rootReducer;
