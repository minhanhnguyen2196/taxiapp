import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { SearchBox } from '../SearchBox/SearchBox';
import SearchResult from '../SearchResult/SearchResult';
import styles from './styles';

const carMarker = require('../../assets/img/carMarker.png');

export default class MapContainer extends React.PureComponent {
	render() {
	const { region, resultTypes, selectedAddress, nearbyDriver, 
			setCurrentAddress, toggleSearchResult, getAddressPrediction } = this.props;
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
			>
			<Marker 
				coordinate={region}
				pinColor='green'
			/>

			{
				selectedPickUp.latitude && 
				<Marker 
					coordinate={{
						latitude: selectedPickUp.latitude,
						longitude: selectedPickUp.longitude
					}}
					pinColor='green'
				/>
			}

			{
				selectedDropOff.latitude && 
				<Marker 
					coordinate={{
						latitude: selectedDropOff.latitude,
						longitude: selectedDropOff.longitude
					}}
					pinColor='blue'
				/>
			}

			{
				nearbyDriver && nearbyDriver.map((marker, index) => 
					<Marker 
						image={carMarker}
						coordinate={{ 
							latitude: marker.coordinate.coordinates[1], 
							longitude: marker.coordinate.coordinates[0] 
						}}
						key={index}
					/>
				)
			}
			{
				(selectedPickUp.latitude && selectedDropOff.latitude) &&
				<MapViewDirections
					origin={origin}
					destination={destination}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={4}
					strokeColor="hotpink"
					mode='driving'
				/>
			}

			</MapView>
			{ 
				!(selectedPickUp.latitude && selectedDropOff.latitude) && 
					<SearchBox
						getInput={this.props.getInput} 
						toggleSearchResult={toggleSearchResult} 
						getAddressPrediction={getAddressPrediction}
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


