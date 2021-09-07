const driverInfo = { };
const getDriverInfoReducer = (state = driverInfo, action) => {
	if (action.type === 'GET_DRIVER_INFO') {
		return action.payload;
	}
	if (action.type === 'CLEAR_STATE') {
		return { };
	}
 return state; 	
};


export default getDriverInfoReducer;
