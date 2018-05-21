const payment = 'Cash';
const setPaymentReducer = (state = payment, action) => {
	if (action.type === 'SET_PAYMENT') {
		return action.payload;
	}
 return state; 	
};

export default setPaymentReducer;

