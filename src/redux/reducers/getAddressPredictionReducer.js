
const getAddressPredictionReducer = (state = [], action) => {
	if (action.type === 'GET_ADDRESS_PREDICTION') {
		return action.payload;
	}
	if (action.type === 'CLEAR_STATE') {
		return [];
	}
 return state; 	
};

export default getAddressPredictionReducer;