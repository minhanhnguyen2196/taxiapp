const nearByDrivers = null;
const getNearbyDriverReducer = (state = nearByDrivers, action) => {
	if (action.type === 'GET_NEARBY_DRIVERS') {
		return action.payload;
	}
 return state; 	
};


export default getNearbyDriverReducer;
