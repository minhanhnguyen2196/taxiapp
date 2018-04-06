const distanceMatrix = { }; 
const getDistanceMatrixReducer = (state = distanceMatrix, action) => {
	if (action.type === 'GET_DISTANCE_MATRIX') {
		return action.payload;
}
 return state; 	
};

export default getDistanceMatrixReducer;