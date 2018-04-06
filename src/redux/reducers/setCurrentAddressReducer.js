const currentAddress = null;
const setCurrentAddressReducer = (state = currentAddress, action) => {
	if (action.type === 'SET_CURRENT_LOCATION') {
		return action.payload;
	}
 return state; 	
};

export default setCurrentAddressReducer;