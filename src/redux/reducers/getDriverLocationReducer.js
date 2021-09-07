const driverLocation = {
	driverLocation: {},
	showFoundDriver: true,
	showCarMarker: false
};
const getDriverLocationReducer = (state = driverLocation, action) => {
	if (action.type === 'GET_DRIVER_LOCATION') {
		return {
			driverLocation: action.payload,
			showFoundDriver: false,
			showCarMarker: true
		};
	}
	if (action.type === 'CLEAR_STATE') {
		return {
			driverLocation: {},
			showFoundDriver: true,
			showCarMarker: false
		};
	}
	if (action.type === 'UPDATE_DRIVER_LOCATION') {
		return {
			...state, 
			driverLocation: action.payload
		};
	}
 return state; 	
};


export default getDriverLocationReducer;
