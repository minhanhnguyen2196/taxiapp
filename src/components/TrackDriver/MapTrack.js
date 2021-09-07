import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { connect } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { 
	getDriverLocation, 
	getDistanceFromDriver, 
	getCurrentLocation,
	getDistanceToDestination } from '../../redux/actionCreators';

const carMarker = require('../../assets/img/carMarker.png');
//console.disableYellowBox = true;

class MapTrack extends React.PureComponent {
	constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: this.props.region.latitude,
        longitude: this.props.region.longitude,
      }),
      rotationAngle: null
    };
  	}

	componentDidMount() {
		//this.refs.marker.showCallout();
		this.watchID = navigator.geolocation.watchPosition((position) => {
			this.props.getCurrentLocation(position);
		}, (error) => console.log(JSON.stringify(error)), 
		);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.driverLocation && 
			this.props.driverLocation.driverLocation !== nextProps.driverLocation.driverLocation) {
			if (this.props.booking.status !== 'started') {
				this.props.getDistanceFromDriver();
			} else this.props.getDistanceToDestination();
			const { coordinate } = this.state;
			const newCoordinate = {
				latitude: nextProps.driverLocation.driverLocation.coordinate.coordinates[1],
				longitude: nextProps.driverLocation.driverLocation.coordinate.coordinates[0]
			};
			if (this.marker) {
				const newRotationAngle = this.getRotationAngle(
				this.props.driverLocation.driverLocation,
				nextProps.driverLocation.driverLocation);
				this.setState({ rotationAngle: newRotationAngle });
				this.marker._component.animateMarkerToCoordinate(newCoordinate, 4000);
				//this.marker._component.showCallout();
			} else {
			coordinate.timing(newCoordinate).start();
			}	
		}
	}
	
	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	getRotationAngle = (previousPosition, currentPosition) => {
		const x1 = previousPosition.coordinate.coordinates[1];
		const y1 = previousPosition.coordinate.coordinates[0];
		const x2 = currentPosition.coordinate.coordinates[1];
		const y2 = currentPosition.coordinate.coordinates[0];

		const xDiff = x2 - x1;
		const yDiff = y2 - y1;
		return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
	};
	
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
			driverLocation.showCarMarker && 
				<Marker.Animated
					image={carMarker}
					coordinate={{
				
					}}
					ref={marker => { this.marker = marker; }}
					rotation={this.state.rotationAngle}
				/>
			}

			{
            (pickUp.latitude && dropOff.latitude) &&
				<MapViewDirections
					origin={origin}
					destination={destination}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={4}
					strokeColor="#e67e22"
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

export default connect(mapStateToProps, 
	{ 
		getDriverLocation, 
		getDistanceFromDriver, 
		getCurrentLocation,
		getDistanceToDestination
	})(MapTrack);


export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject
	},
});
