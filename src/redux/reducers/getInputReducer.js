const inputData = {
		pickUp: '',
		dropOff: ''
};
const getInputReducer = (state = inputData, action) => {
	if (action.type === 'GET_INPUT') {
		const { text, key } = action.payload;
		if (key === 'pickUp') {
		return { ...state, pickUp: text };
		} else 
		if (key === 'dropOff') {
		return { ...state, dropOff: text };
		}
	}
	return state; 	
};

export default getInputReducer;