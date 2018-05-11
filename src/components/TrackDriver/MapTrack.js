import React from 'react';
import { View, BackHandler, StyleSheet } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { connect } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
//import styles from './styles';

import { getDriverLocation, getDistanceFromDriver } from '../../redux/actionCreators';

const carMarker = require('../../assets/img/carMarker.png');

class MapTrack extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: this.props.region.latitude,
        longitude: this.props.region.longitude,
      }),
    };
  }

	componentDidMount() {
		
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(this.props.driverLocation);
		if (this.props.driverLocation.driverLocation) {
			const newCoordinate = {
				latitude: this.props.driverLocation.driverLocation.coordinate.coordinates[1],
				longitude: this.props.driverLocation.driverLocation.coordinate.coordinates[0]
			};
			this.props.getDriverLocation();
			if (this.marker) {
				this.marker._component.animateMarkerToCoordinate(newCoordinate, 5000);
			} 
		}
	}

	render() {
	const { region, selectedAddress, driverLocation, booking } = this.props;
	const { selectedPickUp, selectedDropOff } = selectedAddress;
	const { status, pickUp, dropOff } = booking;

	const GOOGLE_MAPS_APIKEY = 'AIzaSyBRlREWElXlDbqKEBhlSJ8PY9a9lBQONqQ';
    const origin = { 
        latitude: parseFloat(pickUp.latitude), 
        longitude: parseFloat(pickUp.longitude)
    };

    const destination = {
        latitude: parseFloat(dropOff.latitude), 
        longitude: parseFloat(dropOff.longitude)
    };
	
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={region}
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
					<Marker.Animated
						image={carMarker}
						coordinate={{
							latitude: this.props.driverLocation.driverLocation.coordinate.coordinates[1],
							longitude: this.props.driverLocation.driverLocation.coordinate.coordinates[0]
						}}
						ref={marker => { this.marker = marker; }}
					/>
			}

			{
            (pickUp.latitude && dropOff.latitude) &&
				<MapViewDirections
					origin={origin}
					destination={destination}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={4}
					strokeColor="black"
					mode='driving'
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
		driverLocation: state.driverLocation,
		booking: state.booking
	};
}

export default connect(mapStateToProps, { getDriverLocation, getDistanceFromDriver })(MapTrack);


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


			// {
			// 	driverLocation.showCarMarker && 
			// 		<Marker 
			// 			image={carMarker}
			// 			coordinate={{
			// 				latitude: driverLocation.driverLocation.coordinate.coordinates[1],
			// 				longitude: driverLocation.driverLocation.coordinate.coordinates[0]
			// 			}}
			// 		/>
			// }