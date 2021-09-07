import React from 'react';
import { View, StyleSheet, BackHandler, Alert } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import GPSState from 'react-native-gps-state';
import HeaderComponent from '../Header/Header';
import PlacePickerBox from '../PlacePickerBox/PlacePickerBox';

import { getCurrentLocation, getNearbyDrivers } from '../../redux/actionCreators';

const carMarker = require('../../assets/img/carMarker.png');

class InitialScreen extends React.PureComponent {
	componentWillMount() {
		LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: 'This application requires activated GPS to work correctly, turn on GPS now?',
            cancel: 'NO',
            ok: 'Go to Settings',
            showDialog: true, 
            openLocationServices: true, 
            preventOutSideTouch: true, 
            preventBackClick: true
        })
        .then(() => {
            // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
           	navigator.geolocation.getCurrentPosition(
			(position) => {
				this.props.getCurrentLocation(position);
				this.props.getNearbyDrivers();
			},
			(error) => console.log(JSON.stringify(error)),
			{ enableHighAccuracy: false, timeout: 20000 }
			);
        })
        .catch((error) => {
            console.log(error.message);
        });

        GPSState.addListener((status) => {
		switch (status) {

			case GPSState.RESTRICTED:
			Alert.alert(
				'',
				'GPS turned off. Turn on now?',
				[
					{ text: 'Open Settings', onPress: () => GPSState.openSettings() }  
				],
				{ cancelable: false }
			);
			break;

			case GPSState.AUTHORIZED_ALWAYS:
				//TODO do something amazing with you app
			break;

			case GPSState.AUTHORIZED_WHENINUSE:
				//TODO do something amazing with you app
			break;

			default: break;
		}
		});
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackHandle);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackHandle);
		GPSState.removeListener();
	}
	onBackHandle() {
		BackHandler.exitApp();
		return true;
	}

	render() {
		const { region, nearbyDrivers } = this.props;
		return (
		<Container>
			<View style={{ flex: 1 }}>
				<HeaderComponent navigation={this.props.navigation} />
				<View style={{ flex: 1 }}>
				<MapView
					style={styles.map}
					region={region}
				>
				{
				(nearbyDrivers) ? 
					nearbyDrivers.map((marker, index) => 
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

				</MapView>
				</View>
				{
					(region.latitude !== 0) && <PlacePickerBox navigation={this.props.navigation} /> 
				}
					
			</View>
			
		</Container>
		);
	}

}

function mapStateToProps(state) {
	return { 
		region: state.location,
		nearbyDrivers: state.nearbyDriver
	};
}

export default connect(mapStateToProps, { 
	getCurrentLocation, getNearbyDrivers
	})(InitialScreen);


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});


