const booking = {
	status: null
};
const bookCarReducer = (state = booking, action) => {
	if (action.type === 'BOOK_CAR') {
		return action.payload;
	}
	if (action.type === 'UPDATE_BOOKING') {
		return action.payload;
	}
 return state; 	
};


export default bookCarReducer;
