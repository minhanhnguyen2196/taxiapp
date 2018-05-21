import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { connect } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
//import styles from './styles';

import { getDriverLocation, getDistanceFromDriver, getCurrentLocation } from '../../redux/actionCreators';

const carMarker = require('../../assets/img/carMarker.png');
const { width, height } = Dimensions.get('window');

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
		this.watchID = navigator.geolocation.watchPosition((position) => {
			this.props.getCurrentLocation(position);
		}, (error) => console.log(JSON.stringify(error)), 
		);
		
	}

	componentDidUpdate(prevProps, prevState) {
		//console.log(this.props.driverLocation);
		if (this.props.driverLocation.driverLocation !== prevProps.driverLocation.driverLocation) {
			const newCoordinate = {
				latitude: this.props.driverLocation.driverLocation.coordinate.coordinates[1],
				longitude: this.props.driverLocation.driverLocation.coordinate.coordinates[0]
			};

			this.props.getDistanceFromDriver();
			if (this.marker) {
				this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
				this.refs.marker.showCallout();
				this.marker._component.showCallout();
			} 

		}
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
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
				selectedDropOff.latitude && 
				<Marker 
					coordinate={{
						latitude: selectedDropOff.latitude,
						longitude: selectedDropOff.longitude
					}}
				>
				<View style={styles.talkBubble}>
		        	<View style={styles.talkBubbleSquare}>
		        		<Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}> 15 min </Text>
		        	</View>
		        	<View style={styles.talkBubbleTriangle} />
		      	</View>
				</Marker>
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
						title="Driver Location"
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

export default connect(mapStateToProps, { getDriverLocation, getDistanceFromDriver, getCurrentLocation })(MapTrack);


export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject
	},
	talkBubble: {
    	backgroundColor: 'transparent',
    	justifyContent: 'center',
    	alignItems: 'center',
    	paddingBottom: 50
  	},
 	talkBubbleSquare: {
	    width: 90,
	    height: 30,
	    backgroundColor: '#fff',
	    borderRadius: 10,
	    justifyContent: 'center',
    	alignItems: 'center' 
 	 },
  	talkBubbleTriangle: {
	    width: 0,
	    height: 0,
	    backgroundColor: 'transparent',
	    borderStyle: 'solid',
	    borderLeftWidth: 5,
	    borderRightWidth: 5,
	    borderBottomWidth: 10,
	    borderLeftColor: 'transparent',
	    borderRightColor: 'transparent',
	    borderBottomColor: '#fff',
	      transform: [
	      {rotate: '180deg'}
	    ]
  	}
});
