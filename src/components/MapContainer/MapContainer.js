import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { connect } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { SearchBox } from '../SearchBox/SearchBox';
import styles from './styles';

import {
	toggleSearchResult,
	getNearbyDrivers,
	setCurrentAddress,
	clearStates,
	calculateFares,
	getCurrentLocation,
	getSelectedAddress
} from '../../redux/actionCreators';

const carMarker = require('../../assets/img/carMarker.png');
const marker = require('../../assets/img/map-pin.png');

class MapContainer extends React.PureComponent {

	componentDidMount() {
		this.watchID = navigator.geolocation.watchPosition((position) => {
			this.props.getCurrentLocation(position);
		}, (error) => console.log(JSON.stringify(error)),
		);
		//this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		const { selectedAddress } = this.props;
		const { selectedPickUp, selectedDropOff } = selectedAddress;

		this.showMarker();
		if (selectedDropOff.latitude && selectedDropOff !== prevProps.selectedAddress.selectedDropOff) {
			this.refs.map.animateToCoordinate({
				latitude: parseFloat(selectedDropOff.latitude),
				longitude: parseFloat(selectedDropOff.longitude)
			}, 1000);
			//this.refs.map.animateToBearing(80, 1000);
			//this.refs.map.animateToViewingAngle(90, 1000);
		}
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	showMarker = () => {
		const { selectedAddress } = this.props;
		const { selectedPickUp, selectedDropOff } = selectedAddress;
		if ((selectedPickUp.latitude || selectedDropOff.latitude) && this.refs.marker) {
			this.refs.marker.showCallout();
		}
	}


	render() {
		const { region, selectedAddress, nearbyDriver, fare } = this.props;
		const { selectedPickUp, selectedDropOff } = selectedAddress;

		const origin = {
			latitude: selectedPickUp.latitude,
			longitude: selectedPickUp.longitude
		};

		const destination = {
			latitude: selectedDropOff.latitude,
			longitude: selectedDropOff.longitude
		};

		const GOOGLE_MAPS_APIKEY = 'AIzaSyB0MeIPhayVTnc0MOJqk0Cw6f3YIkPh2O0';
		return (
			<KeyboardAvoidingView style={styles.container}>
				<MapView
					style={styles.map}
					region={region}
					ref="map"
				>
					{
						selectedPickUp.latitude &&
						<Marker
							coordinate={{
								latitude: selectedPickUp.latitude,
								longitude: selectedPickUp.longitude
							}}
							pinColor='green'
							title={selectedPickUp.address.replace(", Hà Nội, Việt Nam", "")}
							ref="marker"

						/>
					}


					{
						selectedDropOff.latitude &&
						<Marker
							coordinate={{
								latitude: selectedDropOff.latitude,
								longitude: selectedDropOff.longitude
							}}
							pinColor='red'
							title={selectedDropOff.address.replace(", Hà Nội, Việt Nam", "")}
							ref="marker"

						/>
					}

					{
						(nearbyDriver) ?
							nearbyDriver.map((marker, index) =>
								<Marker
									image={carMarker}
									coordinate={{
										latitude: marker.coordinate.coordinates[1],
										longitude: marker.coordinate.coordinates[0]
									}}
									key={index}
								/>
							) : null
					}
					{
						(selectedPickUp.latitude && selectedDropOff.latitude) &&
						<MapViewDirections
							origin={origin}
							destination={destination}
							apikey={GOOGLE_MAPS_APIKEY}
							strokeWidth={4}
							strokeColor="#ff8d01"
							mode='driving'
						/>

					}

				</MapView>


				{
					!(selectedPickUp.latitude && selectedDropOff.latitude && fare.economyTotalFare) &&
					<SearchBox
						getInput={this.props.getInput}
						toggleSearchResult={this.props.toggleSearchResult}
						getAddressPrediction={this.props.getAddressPrediction}
						selectedAddress={selectedAddress}
						setCurrentAddress={setCurrentAddress}
						getSelectedAddress={this.props.getSelectedAddress}
					/>
				}


			</KeyboardAvoidingView>
		);
	}
}

function mapStateToProps(state) {
	return {
		region: state.location,
		resultTypes: state.resultTypes,
		prediction: state.prediction,
		selectedAddress: state.selectedAddress,
		fare: state.fare,
		booking: state.booking,
		nearbyDriver: state.nearbyDriver,
		carType: state.carType
	};
}

export default connect(mapStateToProps, {
	getCurrentLocation,
	toggleSearchResult,
	getNearbyDrivers,
	setCurrentAddress,
	clearStates,
	calculateFares,
	getSelectedAddress
})(MapContainer);


// <Marker 
// 					coordinate={{
// 						latitude: region.latitude,
// 						longitude: region.longitude
// 					}}
// 				>
// 				<View style={styles.talkBubble}>
// 		        	<View style={styles.talkBubbleSquare}>
// 		        		<Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Your Location </Text>
// 		        	</View>
// 		        	<View style={styles.talkBubbleTriangle} />
// 		      	</View>
// 				</Marker>

	// {
	// 			(fakeMarker.pickUp || fakeMarker.dropOff) && !fare.economyTotalFare &&
	// 			<View pointerEvents="none" style={{ justifyContent: 'center', position: 'absolute' }}>
	// 					<Image source={marker} />
	// 			</View>
	// 		}

	// { (resultType.pickUp || resultType.dropOff) &&
	// 		<SearchResult 
	// 			prediction={this.props.prediction}
	// 		/>
	// 		}	