const resultTypes = {
	resultType: {
			pickUp: null,
			dropOff: null
	},
	prediction: []
 };
const toggleSearchResultReducer = (state = resultTypes, action) => {
	if (action.payload === 'pickUp') {
		return {
			resultType: {
				pickUp: true,
				dropOff: false
			},
			prediction: []
	};
}
	if (action.payload === 'dropOff') {
		return {
			resultType: {
				pickUp: false,
				dropOff: true
			},
			prediction: []
	};
}
	if (action.payload === 'off') {
		return {
			resultType: {
				pickUp: false,
				dropOff: false
			},
			prediction: []
	};
}
 return state; 	
};

export default toggleSearchResultReducer;