import { combineReducers } from 'redux';
import GeoJsonReducer from './Map/geojson_reducer';
import BudgetItemReducer from './App/BudgetPage/budget_reducer';
//import SiteSelectionReducer from './Map/site_selection_reducer'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	geojson: GeoJsonReducer,
	//siteID: SiteSelectionReducer,
	budgetItems: BudgetItemReducer,
	form: formReducer
});

export default rootReducer;
