const distanceFromDriver = { }; 
const getDistanceFromDriverReducer = (state = distanceFromDriver, action) => {
	if (action.type === 'GET_DISTANCE_FROM_DRIVER') {
		return action.payload;
}
 return state; 	
};

export default getDistanceFromDriverReducer;