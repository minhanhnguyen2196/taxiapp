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
		RNGooglePlaces.lookUpPlaceByID(placeID)
		.then((results) => {
			dispatch({
				type: 'GET_SELECTED_ADDRESS',
				payload: results,
				selectedType: getState().resultTypes.resultType.pickUp
			});
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
			setTimeout(() => {
				if (Object.keys(getState().selectedAddress.selectedPickUp).length > 0 && 
			Object.keys(getState().selectedAddress.selectedDropOff).length > 0) {
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
				}
			}, 1000);
	})
		.catch((err) => console.log(err));
	};
}

// clear some states when Back Button is pressed
export function clearStates() {
	return { type: 'CLEAR_STATE' };
}

// call when user select car type
export function setCarType(payload) {
	return {
		type: 'SET_CAR_TYPE',
		payload
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
		var nearbyDrivers = getState().nearbyDriver;
		var sameCarTypeDrivers = [];
		for (var i = 0; i < nearbyDrivers.length; i++) {
			if (nearbyDrivers[i].vehicle.type === getState().carType) {
				sameCarTypeDrivers.push(nearbyDrivers[i]);
			}
		}
		var random = Math.floor(Math.random() * sameCarTypeDrivers.length);
		var chosenDriver = sameCarTypeDrivers[random];
		sameCarTypeDrivers.splice(random, 1);
		var fare = 0;
		switch (getState().carType) {
			case 'Economy': fare = getState().fare.economyTotalFare; break;
			case 'Extra': fare = getState().fare.extraTotalFare; break;
			case 'Luxury': fare = getState().fare.luxuryTotalFare; break;
			default: break;
		}

		var username = 'MA';
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

		var booking = {
			username,
			pickUp,
			dropOff,
			fare,
			status: 'pending',
			chosenDriver: {
				socketId: chosenDriver.socketId,
				driverId: chosenDriver.driverID,
				latitude: chosenDriver.coordinate.coordinates[1],
				longitude: chosenDriver.coordinate.coordinates[0],
				vehicle: chosenDriver.vehicle
			}
		};

		request.post('http://192.168.1.110:3000/api/bookings')
		.send(booking)
		.then((res) => {
			//console.log(res.body);
			dispatch({
				type: 'BOOK_CAR',
				payload: res.body
			});
		})
		.catch(err => console.log(err));
	};
}

// return the locations of nearby drivers
export function getNearbyDrivers() {
	return (dispatch, getState) => {
		request.get('http://192.168.1.110:3000/api/driverLocation')
		.query({
			latitude: getState().location.latitude,
			longitude: getState().location.longitude,
		})
		.finish((err, res) => {
			dispatch({
				type: 'GET_NEARBY_DRIVERS',
				payload: res.body
			});
		});
	};
}

export function removeChosenDriver() {
	return (dispatch, getState) => {
		var chosenDriver = getState().booking.chosenDriver;
		var nearbyDrivers = getState().nearbyDriver;
		var updatedNearbyDrivers = nearbyDrivers.splice(nearbyDrivers.indexOf(chosenDriver), 1);
		dispatch({
			type: 'GET_NEARY_DRIVERS',
			payload: updatedNearbyDrivers
		});
	};
}

// call from initial screen
export function setCurrentAddress() {
	return (dispatch, getState) => {
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
		var driverId = getState().booking.chosenDriver.driverId;
		console.log(driverId);
		request.get(`http://192.168.1.110:3000/api/driver/${driverId}`)
		.finish((err, res) => {
			dispatch({
				type: 'GET_DRIVER_INFO',
				payload: res.body
			});
		});
		console.log('OK');
	};
}

export function getDriverLocation() {
	return (dispatch, getState) => {
		var socketId = getState().booking.chosenDriver.socketId;
		request.get(`http://192.168.1.110:3000/api/driverLocation/${socketId}`)
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

export function cancelBooking() {
	return (dispatch, getState) => {
		var cancelData = {
            id: getState().booking._id,
            status: 'canceled',
        };

        fetch('http://192.168.1.110:3000/api/bookings/' + cancelData.id, 
        {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
            body: JSON.stringify(cancelData)
        })
        .then(res => {
            if (res !== '') console.log('Success');
        })
        .catch(err => console.log(err));
	};
}

		// .then(() => {
		// 	var waiting = setInterval(() => {
		// 		if (getState().booking.status !== 'pending') clearInterval(waiting);
		// 		random = Math.floor(Math.random() * sameCarTypeDrivers.length);
		// 		chosenDriver = sameCarTypeDrivers[random];
		// 		sameCarTypeDrivers.splice(random, 1);
		// 		booking = {
		// 			username,
		// 			pickUp,
		// 			dropOff,
		// 			fare,
		// 			status: 'pending',
		// 			chosenDriver: {
		// 				socketId: chosenDriver.socketId,
		// 				driverId: chosenDriver.driverID,
		// 				latitude: chosenDriver.coordinate.coordinates[1],
		// 				longitude: chosenDriver.coordinate.coordinates[0],
		// 				vehicle: chosenDriver.vehicle
		// 			}
		// 		};
		// 		request.post('http://192.168.1.110:3000/api/bookings')
		// 		.send(booking)
		// 		.then((err, res) => {
		// 			//console.log(res.body);
		// 			dispatch({
		// 				type: 'BOOK_CAR',
		// 				payload: res.body
		// 			});
		// 		});
		// }, 5000);
		// })