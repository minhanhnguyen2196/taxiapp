import React from 'react';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { SearchBox } from '../SearchBox/SearchBox';
import SearchResult from '../SearchResult/SearchResult';
import styles from './styles';

import { getInput, toggleSearchResult, getAddressPrediction, 
		getNearbyDrivers, setCurrentAddress, clearStates, calculateFares
	} 
		from '../../redux/actionCreators';

const carMarker = require('../../assets/img/carMarker.png');

class MapContainer extends React.PureComponent {

	componentDidUpdate(prevProps, prevState) {
		this.showMarker();
	}
	
	showMarker = () => {
	if (this.props.selectedAddress.selectedPickUp.latitude || this.props.selectedAddress.selectedDropOff.latitude) {
		this.refs.marker.showCallout();
	}
	}
	render() {
	const { region, resultTypes, selectedAddress, nearbyDriver, fare } = this.props;
	const { selectedPickUp, selectedDropOff } = selectedAddress;

	const origin = { 
		latitude: selectedPickUp.latitude, 
		longitude: selectedPickUp.longitude 
	};

	const destination = {
		latitude: selectedDropOff.latitude, 
		longitude: selectedDropOff.longitude 
	};

	const lat = (selectedDropOff.latitude + selectedPickUp.latitude) / 2 || 0;
	const long = (selectedDropOff.longitude + selectedPickUp.longitude) / 2 || 0;
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
					title={selectedPickUp.name}
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
					title={selectedDropOff.name}
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
					strokeColor="black"
					mode='driving'
				/>

			}

			{
				(selectedPickUp.latitude && selectedDropOff.latitude) && 
				<Marker 
					coordinate={{
						latitude: lat,
						longitude: long
					}}
					ref="marker"
				>
				<View style={styles.talkBubble}>
		        	<View style={styles.talkBubbleSquare}>
		        		<Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}> 15 min </Text>
		        	</View>
		        	<View style={styles.talkBubbleTriangle} />
		      	</View>
				</Marker>
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
				/>
			}	
			
			{ (resultTypes.resultType.pickUp || resultTypes.resultType.dropOff) &&
			<SearchResult 
				prediction={this.props.prediction}
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
	getInput, 
	toggleSearchResult, 
	getAddressPrediction,
	getNearbyDrivers,
	setCurrentAddress,
	clearStates,
	calculateFares
	})(MapContainer);


