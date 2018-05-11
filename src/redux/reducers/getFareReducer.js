const fare = {
	economyTotalFare: null,
	extraTotalFare: null,
	luxuryTotalFare: null
};
const getFareReducer = (state = fare, action) => {
	if (action.type === 'GET_FARE') {
		return action.payload;
	}
	if (action.type === 'CLEAR_STATE') {
		return {
	economyTotalFare: null,
	extraTotalFare: null,
	luxuryTotalFare: null
};
	}
 return state; 	
};

export default getFareReducer;