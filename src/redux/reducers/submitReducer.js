const userInfo = null;
const submitReducer = (state = userInfo, action) => {
	if (action.type === 'STORE_USER_INFO') {
		return action.payload;
	}
 return state; 	
};


export default submitReducer;
