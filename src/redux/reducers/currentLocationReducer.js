const currentLocation = {
	latitude: 0,
	longitude: 0,
	latitudeDelta: 0.01,
	longitudeDelta: 0.01
 };
const currentLocationReducer = (state = currentLocation, action) => {
  if (action.type === 'GET_CURRENT_LOCATION') {
    return {
        latitude: action.position.coords.latitude,
        longitude: action.position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
  };
}
 return state; 	
};

export default currentLocationReducer;

// latitude: 21.027764,
// longitude: 105.834160,
// latitudeDelta: 0.015,
// longitudeDelta: 0.0121

// latitude: 0,
// 		longitude: 0,
// 		latitudeDelta: 0,
// 		longitudeDelta: 0

	// navigator.geolocation.getCurrentPosition(
 //    getCurrentLocation,
 //    (error) => alert(JSON.stringify(error)),
 //    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
 //    );