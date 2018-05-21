import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentLocationReducer from './currentLocationReducer';
import getInputReducer from './getInputReducer';
import toggleSearchResultReducer from './toggleSearchResultReducer';
import getAddressPredictionReducer from './getAddressPredictionReducer';
import getSelectedAddressReducer from './getSelectedAddressReducer';
import getDistanceMatrixReducer from './getDistanceMatrixReducer';
import getFareReducer from './getFareReducer';
import bookCarReducer from './bookCarReducer';
import getNearbyDriverReducer from './getNearbyDriverReducer';
import userInfoReducer from './userInfoReducer';
import getDriverInfoReducer from './getDriverInfoReducer';
import getDriverLocationReducer from './getDriverLocationReducer';
import setCarTypeReducer from './setCarTypeReducer';
import setPaymentReducer from './setPaymentReducer';
import getDistanceFromDriverReducer from './getDistanceFromDriverReducer';


const rootReducer = combineReducers({
    location: currentLocationReducer,
    inputData: getInputReducer,
	resultTypes: toggleSearchResultReducer,
	prediction: getAddressPredictionReducer,
	selectedAddress: getSelectedAddressReducer,
	distanceMatrix: getDistanceMatrixReducer,
	fare: getFareReducer,
	booking: bookCarReducer,
	nearbyDriver: getNearbyDriverReducer,
	form: formReducer,
	userInfo: userInfoReducer,
	driverInfo: getDriverInfoReducer,
	carType: setCarTypeReducer,
	distanceFromDriver: getDistanceFromDriverReducer,
	driverLocation: getDriverLocationReducer,
	payment: setPaymentReducer
});
export default rootReducer;