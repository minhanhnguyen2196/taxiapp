const driverInfo = 'AAA';
const getDriverInfoReducer = (state = driverInfo, action) => {
	if (action.type === 'GET_DRIVER_INFO') {
		return action.payload;
	}
 return state; 	
};


export default getDriverInfoReducer;
