const distanceFromDriver = null;
const getDistanceFromDriverReducer = (state = distanceFromDriver, action) => {
	if (action.type === 'GET_DISTANCE_FROM_DRIVER') {
		return action.payload;
	}
	if (action.type === 'CLEAR_STATE') {
		return null;
	}
 return state; 	
};

export default getDistanceFromDriverReducer;