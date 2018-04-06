import React from 'react';
import { View, BackHandler, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
//import styles from './styles';

const carMarker = require('../../assets/img/carMarker.png');

class MapTrack extends React.Component {
	
	render() {
	const { region, selectedAddress, driverLocation } = this.props;
	const { selectedPickUp, selectedDropOff } = selectedAddress;
	
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				region={region}
			>

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
				driverLocation.showCarMarker && 
					<Marker 
						image={carMarker}
						coordinate={{
							latitude: driverLocation.driverLocation.coordinate.coordinates[1],
							longitude: driverLocation.driverLocation.coordinate.coordinates[0]
						}}
					/>
			}

			</MapView>
		</View>
	);
 }
}

function mapStateToProps(state) {
	return { 
		region: state.location, 
		selectedAddress: state.selectedAddress,
		nearbyDriver: state.nearbyDriver,
		userInfo: state.userInfo,
		driverInfo: state.driverInfo,
		driverLocation: state.driverLocation
	};
}

export default connect(mapStateToProps, { })(MapTrack);


export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});

	// {
			// 	driverLocation.showCarMarker && 
			// 		<Marker 
			// 			image={carMarker}
			// 			coordinate={{
			// 				latitude: driverLocation.driverLocation.coordinate.coordinates[1],
			// 				longitude: driverLocation.driverLocation.coordinate.coordinates[0]
			// 			}}
			// 			pinColor='blue'
			// 		/>
			// }