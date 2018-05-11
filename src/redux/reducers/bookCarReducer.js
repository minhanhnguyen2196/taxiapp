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
	if (action.type === 'CLEAR_STATE') {
		return { status: null };
	}
 return state; 	
};


export default bookCarReducer;
