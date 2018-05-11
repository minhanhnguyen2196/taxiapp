import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import HeaderComponent from '../Header/Header';
import PlacePickerBox from '../PlacePickerBox/PlacePickerBox';

import { getCurrentLocation } from '../../redux/actionCreators';

class InitialScreen extends React.PureComponent {
	constructor(props) {
		super(props);
		BackHandler.addEventListener('hardwareBackPress', this.onBackHandle);
	}
	componentWillMount() {
		LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: 'This application requires activated GPS to work correctly, turn on GPS now?',
            cancel: 'NO',
            ok: 'YES',
            showDialog: true, 
            openLocationServices: true, 
            preventOutSideTouch: true, 
            preventBackClick: true
        }).then(() => {
            // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
           	navigator.geolocation.getCurrentPosition(
			(position) => {
				this.props.getCurrentLocation(position);
			},
			(error) => console.log(JSON.stringify(error)),
			{ enableHighAccuracy: true, timeout: 20000 }
			);
        }).catch((error) => {
            console.log(error.message);
        });
	}

	onBackHandle = () => {
		BackHandler.exitApp();
		return true;
	}


	render() {
		const { region } = this.props;
		return (
		<Container>
			<View style={{ flex: 1 }}>
				<HeaderComponent navigation={this.props.navigation} />
				<View style={{ flex: 1 }}>
				<MapView
					style={styles.map}
					region={region}
				/>
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
	};
}

export default connect(mapStateToProps, { 
	getCurrentLocation, 
	})(InitialScreen);


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});


