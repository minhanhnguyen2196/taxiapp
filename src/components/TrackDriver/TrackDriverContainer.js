import React from 'react';
import { View, AppState } from 'react-native';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import { Container } from 'native-base';
import HeaderComponent from '../Header/Header';
import MapTrack from './MapTrack';
import DriverProfile from './DriverProfile/DriverProfile';
import TripTracker from './TripTracker/TripTracker';
import DriverRating from './DriverRating/DriverRating';
import { FoundDriverScreen } from './FoundDriverScreen/FoundDriverScreen';


import { getCurrentLocation, getNearbyDrivers, getDriverInfo, 
		getDriverLocation, getDistanceFromDriver } from '../../redux/actionCreators';

class TrackDriverContainer extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.handle = this.handle.bind(this);
	}
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
			this.props.getCurrentLocation(position);
		},
		(error) => console.log(JSON.stringify(error)),
		{ enableHighAccuracy: false, timeout: 20000 }
		);

		this.props.getDriverInfo();
		AppState.addEventListener('change', this.handle);
		PushNotification.configure({
		onNotification: (notification) => {
		console.log('NOTIFICATION:', notification);
		},
		});
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handle);
	}

	handle(appState) {
	if (appState === 'background' && this.props.distanceFromDriver) {
		const duration = this.props.distanceFromDriver.rows[0].elements[0].duration.text;
		PushNotification.localNotificationSchedule({
			message: "Your driver will be arrived in" + " " + duration, 
			date: new Date(Date.now() + (2 * 1000)) 
		});
	}
	}

	render() {
		const { region, driverInfo, driverLocation, booking, distanceFromDriver } = this.props;
		return (
		<Container>
			<HeaderComponent navigation={this.props.navigation} />
			{
				region.latitude &&
				<MapTrack />
			}
			{
				distanceFromDriver && <TripTracker driverInfo={driverInfo} distanceFromDriver={distanceFromDriver} />
			}
			
			<DriverProfile driverInfo={driverInfo} getDriverLocation={this.props.getDriverLocation} />
			{
				driverLocation.showFoundDriver && 
					<FoundDriverScreen 
						driverInfo={driverInfo}
						getDriverLocation={this.props.getDriverLocation}
					/>
			}
			{
				booking.status === 'completed' && <DriverRating />
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

export default connect(mapStateToProps, { 
	getCurrentLocation, getNearbyDrivers, getDriverInfo, getDriverLocation, getDistanceFromDriver
	})(TrackDriverContainer);

/* 
<TripTracker driverInfo={driverInfo} />
			<DriverProfile driverInfo={driverInfo} getDriverLocation={this.props.getDriverLocation} />
			{
				driverLocation.showFoundDriver && 
					<FoundDriverScreen 
						driverInfo={driverInfo}
						getDriverLocation={this.props.getDriverLocation}
					/>
			}

*/