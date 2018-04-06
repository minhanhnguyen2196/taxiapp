const toggle = false;
const togglePlacePickerBoxReducer = (state = toggle, action) => {
	if (action.type === 'CHECK_IF_CLICKED') {
		return true;
	}
	if (action.type === 'TOGGLE_CLICKED') {
		return false;
	}
 return state; 	
};


export default togglePlacePickerBoxReducer;
