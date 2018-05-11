const userInfo = {
	socketID: null,
	personalInfo: null
};
const userInfoReducer = (state = userInfo, action) => {
	if (action.type === 'SAVE_SOCKET_ID') {
		return { ...state, socketID: action.payload };
	}
	if (action.type === 'STORE_USER_INFO') {
		return { ...state, personalInfo: action.payload };
	}
 return state; 	
};


export default userInfoReducer;