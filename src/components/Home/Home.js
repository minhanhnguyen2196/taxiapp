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
import styles from './styles';

import { getCurrentLocation, getInput, toggleSearchResult, getAddressPrediction, 
		getNearbyDrivers, setCurrentAddress, clearStates
	} 
		from '../../redux/actionCreators';

class Home extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onBackHandle = this.onBackHandle.bind(this);
		BackHandler.addEventListener('hardwareBackPress', this.onBackHandle);
	}
	
	componentDidMount() {
		setTimeout(() => {
			this.props.getNearbyDrivers();
		}, 1000);
	}

	componentDidUpdate(prevProps, prevState) {
		//console.log(this.props.nearbyDriver);
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
	const { region, booking, selectedAddress, carType } = this.props;
	const { selectedPickUp, selectedDropOff } = selectedAddress;
	const { status } = booking || {};
		return (
		<Container>
		{ (status !== 'pending') ? 
			(
			<View style={{ flex: 1 }}>
				{
					(selectedPickUp.latitude && selectedDropOff.latitude) ? null :
						<HeaderComponent navigation={this.props.navigation} />
				}
				
				<MapContainer 
					region={region} 
					getInput={this.props.getInput} 
					toggleSearchResult={this.props.toggleSearchResult}
					getAddressPrediction={this.props.getAddressPrediction}
					resultTypes={this.props.resultTypes}
					prediction={this.props.prediction}
					selectedAddress={this.props.selectedAddress}
					nearbyDriver={this.props.nearbyDriver}
					setCurrentAddress={this.props.setCurrentAddress}
					navigation={this.props.navigation}
					carType={carType}
				/>

				{
					(selectedPickUp.latitude && selectedDropOff.latitude && !carType) && <RideTypeWindow />
				}
				{
					carType && <BookingButton />
				}
				{
					carType && <CancelButton />
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
		clicked: state.clicked,
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
	clearStates
	})(Home);
