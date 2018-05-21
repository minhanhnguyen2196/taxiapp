const selectedAddress = {
	selectedPickUp: { },
	selectedDropOff: { },
	
 }; 
const getSelectedAddressReducer = (state = selectedAddress, action) => {
	const selected = (action.selectedType) ? 'selectedPickUp' : 'selectedDropOff';
	if (action.type === 'GET_SELECTED_ADDRESS') {
		if (selected === 'selectedPickUp') {
			return { ...state, selectedPickUp: action.payload };
		}
		if (selected === 'selectedDropOff') {
			return { ...state, selectedDropOff: action.payload };
		}
	}
	if (action.type === 'CLEAR_STATE') {
		return { selectedPickUp: {}, selectedDropOff: {} };
	}
 return state; 	
};

export default getSelectedAddressReducer;