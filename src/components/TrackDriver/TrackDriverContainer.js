import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import HeaderComponent from '../Header/Header';
import MapTrack from './MapTrack';
import DriverProfile from './DriverProfile/DriverProfile';
import TripTracker from './TripTracker/TripTracker';
import { FoundDriverScreen } from './FoundDriverScreen/FoundDriverScreen';


import { getCurrentLocation, getNearbyDrivers, getDriverInfo, 
		getDriverLocation, getDistanceFromDriver } from '../../redux/actionCreators';

class TrackDriverContainer extends React.Component {
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.props.getCurrentLocation(position);
		},
		(error) => console.log(JSON.stringify(error)),
		{ enableHighAccuracy: true, timeout: 20000 }
		);

		this.props.getDriverInfo();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.driverLocation && nextProps.driverLocation !== this.props.driverLocation) {
			this.props.getDistanceFromDriver();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		//console.log(this.props.driverInfo);
		console.log(this.props.driverLocation);
		console.log(this.props.distanceFromDriver);
	}
	render() {
		const { region, driverInfo, driverLocation, distanceFromDriver } = this.props;
		return (
		<Container>
			<HeaderComponent navigation={this.props.navigation} />
			{
				region.latitude &&
				<MapTrack />
			}

			<TripTracker driverInfo={driverInfo} distanceFromDriver={distanceFromDriver} />
			<DriverProfile driverInfo={driverInfo} getDriverLocation={this.props.getDriverLocation} />
			{
				driverLocation.showFoundDriver && 
					<FoundDriverScreen 
						driverInfo={driverInfo}
						getDriverLocation={this.props.getDriverLocation}
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