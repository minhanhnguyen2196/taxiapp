const booking = null;
const handleConfirmBookingReducer = (state = booking, action) => {
	if (action.type === 'BOOKING_CONFIRMED') {
		return action.payload;
	}
 return state; 	
};


export default handleConfirmBookingReducer;
