const driverLocation = {
	driverLocation: null,
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
	// if (action.type === 'UPDATE_DRIVER_LOCATION') {
	// 	return {
	// 		...state, driverLocation: { coordinate: {
	// 			coordinates: []
	// 		} },
	// 	};
	// }
 return state; 	
};


export default getDriverLocationReducer;
