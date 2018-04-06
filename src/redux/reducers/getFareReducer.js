const fare = {
	economyTotalFare: null,
	extraTotalFare: null,
	luxuryTotalFare: null
};
const getFareReducer = (state = fare, action) => {
	if (action.type === 'GET_FARE') {
		return action.payload;
	}
 return state; 	
};

export default getFareReducer;