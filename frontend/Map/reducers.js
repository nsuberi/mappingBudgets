import { combineReducers } from 'redux';
import GeoJsonReducer from './geojson_reducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
	geojson: GeoJsonReducer,
	form: formReducer
});

export default rootReducer;
