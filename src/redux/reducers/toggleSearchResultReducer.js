const resultTypes = {
	resultType: {
		pickUp: null,
		dropOff: null
	},
	fakeMarker: {
		pickUp: null,
		dropOff: null
	}
 };
const toggleSearchResultReducer = (state = resultTypes, action) => {
	switch (action.payload) {
		case 'pickUp': {
			return {
			resultType: {
				pickUp: true,
				dropOff: false
			},
			fakeMarker: {
				pickUp: false,
				dropOff: false
			}
			};
			break;
		}
		case 'dropOff': {
			return {
			resultType: {
				pickUp: false,
				dropOff: true
			},
			fakeMarker: {
				pickUp: false,
				dropOff: false
			}		
			};
			break;
		}
		case 'off': {
			return {
			resultType: {
				pickUp: false,
				dropOff: false
			},
			fakeMarker: {
				pickUp: false,
				dropOff: false
			}			
			};
			break;
		}
		case 'showFakeMarkerPickUp': {
			return {
			resultType: {
				pickUp: false,
				dropOff: false
			},
			fakeMarker: {
				pickUp: true,
				dropOff: false
			}
			};
			break;
		}
		case 'showFakeMarkerDropOff': {
			return {
			resultType: {
				pickUp: false,
				dropOff: false
			},
			fakeMarker: {
				pickUp: false,
				dropOff: true
			}
		};
		break;
		}
		default: break;	
	}
	if (action.type === 'CLEAR_STATE') {
		return {
			resultType: {
				pickUp: false,
				dropOff: false
			},
			fakeMarker: {
				pickUp: false,
				dropOff: false
			}
		};
	}
	return state; 	
};

export default toggleSearchResultReducer;
