import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import MapContainer from '../MapContainer/MapContainer';
import HeaderComponent from '../Header/Header';
import BookingButton from '../Button/BookingButton';
import CancelButton from '../Button/CancelButton';
import FoundDriverScreen from '../FoundDriverScreen/FoundDriverScreen';
import RideTypeWindow from '../RideTypeWindow/RideTypeWindow';
import EstimatedFareWindow from '../RideTypeWindow/EstimatedFareWindow';
import ConfirmButton from '../Button/ConfirmButton';
import styles from './styles';

import { getCurrentLocation, getInput, toggleSearchResult, getAddressPrediction, 
		getNearbyDrivers, setCurrentAddress, clearStates, calculateFares
	} 
		from '../../redux/actionCreators';

class Home extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onBackHandle = this.onBackHandle.bind(this);
		BackHandler.addEventListener('hardwareBackPress', this.onBackHandle);
	}
	
	componentWillReceiveProps(nextProps) {
		if (this.props.selectedAddress.selectedPickUp !== nextProps.selectedAddress.selectedPickUp 
			&& Object.keys(nextProps.selectedAddress.selectedPickUp).length > 0) {
				this.props.getNearbyDrivers();
			}
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(this.props.booking);
		if (this.props.booking.status === 'confirmed') {
			this.props.navigation.navigate('TrackDriverContainer');
		}
	}

	onBackHandle = () => {
		//this.props.toggleSearchResult('off');
		this.props.clearStates();
		this.props.navigation.goBack();
		return true;
	}

	render() {
	const { region, booking, selectedAddress, carType, fare } = this.props;
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
	getInput, 
	toggleSearchResult, 
	getAddressPrediction,
	getNearbyDrivers,
	setCurrentAddress,
	clearStates,
	calculateFares
	})(Home);


// region={region} 
// 					getInput={this.props.getInput} 
// 					toggleSearchResult={this.props.toggleSearchResult}
// 					getAddressPrediction={this.props.getAddressPrediction}
// 					resultTypes={this.props.resultTypes}
// 					prediction={this.props.prediction}
// 					selectedAddress={this.props.selectedAddress}
// 					nearbyDriver={this.props.nearbyDriver}
// 					setCurrentAddress={this.props.setCurrentAddress}
// 					navigation={this.props.navigation}
// 					carType={carType}
// 					getNearbyDrivers={this.props.getNearbyDrivers}