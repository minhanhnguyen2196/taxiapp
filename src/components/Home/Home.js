import React from 'react';
import { View, BackHandler, Alert } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import GPSState from 'react-native-gps-state';
import MapContainer from '../MapContainer/MapContainer';
import HeaderComponent from '../Header/Header';
import FoundDriverScreen from '../FoundDriverScreen/FoundDriverScreen';
import RideTypeWindow from '../RideTypeWindow/RideTypeWindow';
import EstimatedFareWindow from '../RideTypeWindow/EstimatedFareWindow';
import ConfirmButton from '../Button/ConfirmButton';

import { getCurrentLocation, getNearbyDrivers, setCurrentAddress, clearStates, calculateFares
	} 
		from '../../redux/actionCreators';

class Home extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onBackHandle = this.onBackHandle.bind(this);
		BackHandler.addEventListener('hardwareBackPress', this.onBackHandle);
	}
	
	componentWillMount() {
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
	componentDidUpdate(prevProps, prevState) {
		console.log(this.props.distanceMatrix);
		if (this.props.booking.status === 'confirmed') {
			this.props.navigation.navigate('TrackDriverContainer');
		}
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackHandle);
		GPSState.removeListener();
	}
	
	onBackHandle = () => {
		//this.props.toggleSearchResult('off');
		this.props.clearStates();
		this.props.navigation.goBack();
		return true;
	}
	
	render() {
	const { booking, selectedAddress, carType, fare } = this.props;
	const { selectedPickUp, selectedDropOff } = selectedAddress;
	const { status } = booking || {};
		return (
		<Container>
		{ (status !== 'pending') ? 
			(
			<View style={{ flex: 1 }}>
				{
					(selectedPickUp.latitude && selectedDropOff.latitude && !carType) ? null :
						<HeaderComponent navigation={this.props.navigation} />
				}
				
				<MapContainer />
				{
					(selectedPickUp.latitude && selectedDropOff.latitude && !fare.economyTotalFare) && 
					<ConfirmButton calculateFares={this.props.calculateFares} />
				}
				{
					(!carType && fare.economyTotalFare) && <RideTypeWindow navigation={this.props.navigation} />
				}
				{
					carType && <EstimatedFareWindow />
				}
				
			</View>
			) : <FoundDriverScreen />
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
		userInfo: state.userInfo,
		carType: state.carType
	};
}

export default connect(mapStateToProps, { 
	getCurrentLocation, 
	getNearbyDrivers,
	setCurrentAddress,
	clearStates,
	calculateFares
	})(Home);
