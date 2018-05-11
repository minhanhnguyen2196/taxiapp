import RNGooglePlaces from 'react-native-google-places';
import request from '.././utils/request';
import calculateFare from '.././utils/fareCaculator';

export function getCurrentLocation(position) {
	return { type: 'GET_CURRENT_LOCATION', position };
} 

// get text input 
export function getInput(payload) {
	return { type: 'GET_INPUT', payload };
}

// toggle search result 
export function toggleSearchResult(payload) {
	return { type: 'TOGGLE_SEARCH_RESULT', payload };
}

// show address prediction 
export function getAddressPrediction() {
	return (dispatch, getState) => {
		const { resultTypes, inputData } = getState();
		const userInput = resultTypes.resultType.pickUp ? inputData.pickUp : inputData.dropOff;
		RNGooglePlaces.getAutocompletePredictions(userInput, {
				type: 'address',
				country: 'VN'
			}
		)
		.then((results) => {
			dispatch({
				type: 'GET_ADDRESS_PREDICTION',
				payload: results
			});
		}
	)
		.catch((err) => console.log(err));
	};
}

// select address 
export function getSelectedAddress(placeID) {
	return (dispatch, getState) => {
		RNGooglePlaces.lookUpPlaceByID(placeID)
		.then((results) => {
			dispatch({
				type: 'GET_SELECTED_ADDRESS',
				payload: results,
				selectedType: getState().resultTypes.resultType.pickUp
			});
		})
		.then(() => {
			if (getState().resultTypes.resultType.pickUp) {
				var position = {
					coords: {
						latitude: getState().selectedAddress.selectedPickUp.latitude,
						longitude: getState().selectedAddress.selectedPickUp.longitude,
					}
				};
				dispatch({
					type: 'GET_CURRENT_LOCATION',
					position
				});
			}
		})
		.then(() => {
			dispatch({
				type: 'TOGGLE_SEARCH_RESULT',
				payload: 'off'
			});
		})
		.then(() => {
			if (Object.keys(getState().selectedAddress.selectedPickUp).length > 0 && 
			Object.keys(getState().selectedAddress.selectedDropOff).length > 0) {
				const pickUpLatitude = String(getState().selectedAddress.selectedPickUp.latitude);
				const pickUpLongtitude = String(getState().selectedAddress.selectedPickUp.longitude);
				const dropOffLatitude = String(getState().selectedAddress.selectedDropOff.latitude);
				const dropOffLongtitude = String(getState().selectedAddress.selectedDropOff.longitude);
				request.get('https://maps.googleapis.com/maps/api/distancematrix/json')
				.query({
					origins: pickUpLatitude.concat(',', pickUpLongtitude),
					destinations: dropOffLatitude.concat(',', dropOffLongtitude),
					mode: 'driving',
					key: 'AIzaSyATk0Zv5NZtSzaj04-SQrxSjyn9PjEcpxM'
				})
				.finish((err, res) => {
					dispatch({
						type: 'GET_DISTANCE_MATRIX',
						payload: res.body
					});
				});
			}
		})
		.catch((err) => console.log(err));
	};
}

export function calculateFares() {
	const economyFare = {
		baseFare: 10000,
		costPerMinute: 1000,
		surge: 1,
		costPerKm: 2000
	};
	const extraFare = {
		baseFare: 15000,
		costPerMinute: 1000,
		surge: 1,
		costPerKm: 3000
	};
	const luxuryFare = {
		baseFare: 20000,
		costPerMinute: 5000,
		surge: 1.2,
		costPerKm: 5000
	};

	return (dispatch, getState) => {
		const duration = getState().distanceMatrix.rows[0].elements[0].duration.value;
		const distance = getState().distanceMatrix.rows[0].elements[0].distance.value;

		const economyTotalFare = calculateFare(
			economyFare.baseFare,
			economyFare.costPerMinute,
			duration,
			economyFare.costPerKm,
			distance,
			economyFare.surge
		);

		const extraTotalFare = calculateFare(
			extraFare.baseFare,
			extraFare.costPerMinute,
			duration,
			extraFare.costPerKm,
			distance,
			extraFare.surge
		);

		const luxuryTotalFare = calculateFare(
			luxuryFare.baseFare,
			luxuryFare.costPerMinute,
			duration,
			luxuryFare.costPerKm,
			distance,
			luxuryFare.surge
		);

		const fare = {
			economyTotalFare,
			extraTotalFare,
			luxuryTotalFare
		};
		dispatch({
			type: 'GET_FARE',
			payload: fare
		});
	};
}
// clear some states when Back Button is pressed
export function clearStates() {
	return { type: 'CLEAR_STATE' };
}

// call when user select car type
export function setCarType(payload) {
	return (dispatch, getState) => {
		dispatch({
			type: 'SET_CAR_TYPE',
			payload
		});
		var nearbyDrivers = getState().nearbyDriver;
		var sameCarTypeDrivers = [];
		for (var i = 0; i < nearbyDrivers.length; i++) {
			if (nearbyDrivers[i].vehicle.type === getState().carType) {
				sameCarTypeDrivers.push(nearbyDrivers[i]);
			}
		}
		dispatch({
			type: 'GET_NEARBY_DRIVERS',
			payload: sameCarTypeDrivers
		});
	};
}

// call when Cancal Button is pressed
export function unsetCarType() {
	return {
		type: 'UNSET_CAR_TYPE'	
	};
}


// call when Book Button is pressed
export function bookCar() {
	return (dispatch, getState) => {
		var fare = 0;

		switch (getState().carType) {
			case 'Economy': fare = getState().fare.economyTotalFare; break;
			case 'Extra': fare = getState().fare.extraTotalFare; break;
			case 'Luxury': fare = getState().fare.luxuryTotalFare; break;
			default: break;
		}

		var username = getState().userInfo.personalInfo.username;
		var userSocketID = getState().userInfo.socketID;
		var pickUp = {
			address: getState().selectedAddress.selectedPickUp.address,
			name: getState().selectedAddress.selectedPickUp.name,
			latitude: getState().selectedAddress.selectedPickUp.latitude,
			longitude: getState().selectedAddress.selectedPickUp.longitude
		};
		var dropOff = {
			address: getState().selectedAddress.selectedDropOff.address,
			name: getState().selectedAddress.selectedDropOff.name,
			latitude: getState().selectedAddress.selectedDropOff.latitude,
			longitude: getState().selectedAddress.selectedDropOff.longitude
		};

		var vehicle = getState().carType;
		var date = new Date();
		var bookTime = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + 'at' + ' '
						+ date.getHours() + ':' +  date.getMinutes();
		var booking = {
			username,
			userSocketID,
			pickUp,
			dropOff,
			fare,
			status: 'pending',
			bookTime,
			vehicle,
			driver: { }
		};
		
		request.post('https://gettaxiapp.herokuapp.com/api/bookings')
		.send(booking)
		.then((res) => {
			if (!res.body.error) {
				dispatch({
					type: 'BOOK_CAR',
					payload: res.body
				});
			} else alert('No driver available at the moment');	
		})
		.catch(err => console.log(err));
	};
}

// return the locations of nearby drivers
export function getNearbyDrivers() {
	return (dispatch, getState) => {
		request.get('https://gettaxiapp.herokuapp.com/api/driverCurrentData')
		.query({
			latitude: getState().selectedAddress.selectedPickUp.latitude,
			longitude: getState().selectedAddress.selectedPickUp.longitude,
		})
		.finish((err, res) => {
			dispatch({
				type: 'GET_NEARBY_DRIVERS',
				payload: res.body
			});
		});
	};
}


// call from initial screen
export function setCurrentAddress() {
	return (dispatch, getState) => {
		if (getState().location.latitude) {
			const latitude = getState().location.latitude;
			const longitude = getState().location.longitude;

			const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCySbsulJzXe-A4EP2NRAGJWCua7p4gaqI';
			fetch(url)
			.then(res => res.json())
			.then(resjson => {
				RNGooglePlaces.lookUpPlaceByID(resjson.results[0].place_id)
				.then((result) => {
					dispatch({
						type: 'GET_SELECTED_ADDRESS',
						payload: result,
						selectedType: 'selectedPickUp'
					});
				})
			.catch((err) => console.log(err));
			});
		}
    };
}

// when finish register/sign in
export function getUserInfo(payload) {
	return {
		type: 'STORE_USER_INFO',
		payload
	};
}

export function getDriverInfo() {
	return (dispatch, getState) => {
		var driverId = getState().booking.driver.driverID;
		console.log(driverId);
		request.get(`https://gettaxiapp.herokuapp.com/api/driver/${driverId}`)
		.finish((err, res) => {
			dispatch({
				type: 'GET_DRIVER_INFO',
				payload: res.body
			});
		});
	};
}

export function getDriverLocation() {
	return (dispatch, getState) => {
		var socketId = getState().booking.driver.socketID;
		request.get(`https://gettaxiapp.herokuapp.com/api/driverCurrentData/${socketId}`)
		.finish((err, res) => {
			dispatch({
				type: 'GET_DRIVER_LOCATION',
				payload: res.body
			});
		});
	};
}

export function getDistanceFromDriver() {
	return (dispatch, getState) => {
		const pickUpLatitude = String(getState().selectedAddress.selectedPickUp.latitude);
		const pickUpLongtitude = String(getState().selectedAddress.selectedPickUp.longitude);
		const driverLatitude = String(getState().driverLocation.driverLocation.coordinate.coordinates[1]);
		const driverLongitude = String(getState().driverLocation.driverLocation.coordinate.coordinates[0]);
		if (getState().driverLocation) {
			request.get('https://maps.googleapis.com/maps/api/distancematrix/json')
			.query({
				origins: pickUpLatitude.concat(',', pickUpLongtitude),
				destinations: driverLatitude.concat(',', driverLongitude),
				mode: 'driving',
				key: 'AIzaSyATk0Zv5NZtSzaj04-SQrxSjyn9PjEcpxM'
			})
			.finish((err, res) => {
				dispatch({
					type: 'GET_DISTANCE_FROM_DRIVER',
					payload: res.body
				});
			});
		}	
	};
}


export function updateTripStatus(status) {
return (dispatch, getState) => {
    var updateData = {
        id: getState().booking._id,
        status,
    };

    fetch('https://gettaxiapp.herokuapp.com/api/bookings/' + updateData.id, 
    {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
        body: JSON.stringify(updateData)
    })
    .then(res => {
        if (res !== '') console.log('Success');
    })
    .catch(err => console.log(err));
};
}