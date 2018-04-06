const carType = null;
const setCarTypeReducer = (state = carType, action) => {
	if (action.type === 'SET_CAR_TYPE') {
		return action.payload;
	}
	if (action.type === 'CLEAR_STATE' || action.type === 'UNSET_CAR_TYPE') {
		return null;
	}
 return state; 	
};


export default setCarTypeReducer;


