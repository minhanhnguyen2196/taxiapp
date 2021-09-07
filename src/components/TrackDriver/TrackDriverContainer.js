import React from 'react';
import { View, AppState, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import { Container } from 'native-base';
import HeaderComponent from '../Header/Header';
import MapTrack from './MapTrack';
import DriverProfile from './DriverProfile/DriverProfile';
import TripTracker from './TripTracker/TripTracker';
import DriverRating from './DriverRating/DriverRating';
import FoundDriverScreen from './FoundDriverScreen/FoundDriverScreen';

import { 
	getCurrentLocation, 
	getNearbyDrivers, 
	getDriverInfo, 
	getDriverLocation, 
	getDistanceFromDriver, 
	updateTripStatus, 
	clearStates } from '../../redux/actionCreators';

console.disableYellowBox = true;
class TrackDriverContainer extends React.PureComponent {
	constructor(props) {
		super(props);	
		this.handle = this.handle.bind(this);
		this.handleBackButton = this.handleBackButton.bind(this);
	}
	componentWillMount() {
		this.props.getDriverInfo();
	}
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
			this.props.getCurrentLocation(position);
		},
		(error) => console.log(JSON.stringify(error)),
		{ enableHighAccuracy: false, timeout: 20000 }
		);

		AppState.addEventListener('change', this.handle);
		PushNotification.configure({
		onNotification: (notification) => {
		console.log('NOTIFICATION:', notification);
		},
		});
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handle);
		this.props.clearStates();
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	handle(appState) {
	if (appState === 'background' && this.props.distanceFromDriver) {
		const duration = this.props.distanceFromDriver.rows[0].elements[0].duration.text;
		PushNotification.localNotificationSchedule({
			message: "Your driver has arrived ", 
			date: new Date(Date.now() + (2 * 1000)) 
		});
	}
	}

	handleBackButton() {
        return true;
    }

	render() {
		const { region, driverInfo, driverLocation, booking, distanceFromDriver } = this.props;
		return (
		<Container>
			{
				region.latitude &&
				<MapTrack />
			}
			{
				distanceFromDriver && booking.status !== 'completed' &&
				<TripTracker 
					driverInfo={driverInfo} 
					distanceFromDriver={distanceFromDriver}
					clearStates={this.props.clearStates}
					updateTripStatus={this.props.updateTripStatus}
					navigation={this.props.navigation}
					booking={this.props.booking}

				/>
			}
			{
				booking.status !== 'completed' && 
				<DriverProfile driverInfo={driverInfo} getDriverLocation={this.props.getDriverLocation} />
			}
			
			{
				driverLocation.showFoundDriver && 
					<FoundDriverScreen 
						driverInfo={driverInfo}
						getDriverLocation={this.props.getDriverLocation}
					/>
			}
			{
				booking.status === 'completed' && 
				<DriverRating 
					clearStates={this.props.clearStates}
					navigation={this.props.navigation}
				/>
			}
			
		</Container>
		);
	}
}

function mapStateToProps(state) {
	return { 
		region: state.location, 
		inputData: state.inputData,
		resultTypes: state.resultTypes,
		prediction: state.prediction,
		selectedAddress: state.selectedAddress,
		distanceMatrix: state.distanceMatrix,
		fare: state.fare,
		booking: state.booking,
		nearbyDriver: state.nearbyDriver,
		clicked: state.clicked,
		userInfo: state.userInfo,
		driverInfo: state.driverInfo,
		driverLocation: state.driverLocation,
		distanceFromDriver: state.distanceFromDriver
	};
}

export default connect(mapStateToProps, 
{ 
	getCurrentLocation, 
	getNearbyDrivers, 
	getDriverInfo, 
	getDriverLocation, 
	getDistanceFromDriver, 
	updateTripStatus, 
	clearStates
	})(TrackDriverContainer);
