import React from 'react';
import { KeyboardAvoidingView, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { SearchBox } from '../SearchBox/SearchBox';
import SearchResult from '../SearchResult/SearchResult';
import styles from './styles';

import { 
	getInput, 
	toggleSearchResult, 
	getAddressPrediction, 
	getNearbyDrivers, 
	setCurrentAddress, 
	clearStates, 
	calculateFares, 
	getCurrentLocation, 
	selectAddressByMarker
	} from '../../redux/actionCreators';

const carMarker = require('../../assets/img/carMarker.png');
const marker = require('../../assets/img/map-pin.png');

class MapContainer extends React.PureComponent {
	constructor(props) {
	super(props);
	this.state = { 
	initialRegion: {
		latitude: this.props.region.latitude,
		longitude: this.props.region.longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01
	}
	};
	}

	componentDidMount() {
		this.watchID = navigator.geolocation.watchPosition((position) => {
			this.props.getCurrentLocation(position);
		}, (error) => console.log(JSON.stringify(error)), 
		);
		this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);
		
	}
	
	componentWillReceiveProps(nextProps) {
		const { selectedAddress, resultTypes } = this.props;
		const { initialRegion } = this.state;
		const { latitudeDelta, longitudeDelta } = initialRegion;
		const { resultType } = resultTypes;
		if (selectedAddress !== nextProps.selectedAddress && (resultType.pickUp || resultType.dropOff)
			&& Object.keys(nextProps.selectedAddress.selectedPickUp).length > 0) {
			this.setState({ 
			initialRegion: {
				latitude: nextProps.selectedAddress.selectedPickUp.latitude,
				longitude: nextProps.selectedAddress.selectedPickUp.longitude,
				latitudeDelta,
				longitudeDelta
			} 
			});
		}
	}
	componentDidUpdate(prevProps, prevState) {
		this.showMarker();	
	}
	
	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	showMarker = () => {
		const { selectedAddress } = this.props;
		const { selectedPickUp, selectedDropOff } = selectedAddress;
		if (selectedPickUp.latitude || selectedDropOff.latitude) {
		this.refs.marker.showCallout();
	}
	}

	_onRegionChangeComplete = (region) => {
		const { resultTypes, fare } = this.props;
		const { fakeMarker } = resultTypes;
		if (!fare.economyTotalFare) {
			if (fakeMarker.pickUp) {
			this.props.selectAddressByMarker(region, true);
			this.setState({ initialRegion: region });	
		} else if (fakeMarker.dropOff) {
			this.props.selectAddressByMarker(region, false);
			this.setState({ initialRegion: region });	
		}
		}	
	}

	render() {
	const { initialRegion } = this.state;
	const { region, resultTypes, selectedAddress, nearbyDriver, fare } = this.props;
	const { selectedPickUp, selectedDropOff } = selectedAddress;
	const { fakeMarker, resultType } = resultTypes;

	const origin = { 
		latitude: selectedPickUp.latitude, 
		longitude: selectedPickUp.longitude 
	};

	const destination = {
		latitude: selectedDropOff.latitude, 
		longitude: selectedDropOff.longitude 
	};

	const GOOGLE_MAPS_APIKEY = 'AIzaSyB0MeIPhayVTnc0MOJqk0Cw6f3YIkPh2O0';
	return (
		<KeyboardAvoidingView style={styles.container}>
			<MapView
				style={styles.map}
				region={initialRegion}
				ref="map"
				onRegionChangeComplete={this._onRegionChangeComplete}
			>
			<Marker 
				coordinate={{
					latitude: region.latitude,
					longitude: region.longitude
				}}
				pinColor='green'
				title='Your Location'
				ref="marker"
				
			/>
			{
				selectedPickUp.latitude && fare.economyTotalFare &&
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
				selectedDropOff.latitude && fare.economyTotalFare &&
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
				(nearbyDriver) ? 
					nearbyDriver.map((marker, index) => 
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
			{
				(selectedPickUp.latitude && selectedDropOff.latitude && fare.economyTotalFare) && 
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
			{
				(fakeMarker.pickUp || fakeMarker.dropOff) && !fare.economyTotalFare &&
				<View pointerEvents="none" style={{ justifyContent: 'center', position: 'absolute' }}>
						<Image source={marker} />
				</View>
			}
			
			{
				!(selectedPickUp.latitude && selectedDropOff.latitude && fare.economyTotalFare) && 
				<SearchBox
					getInput={this.props.getInput} 
					toggleSearchResult={this.props.toggleSearchResult} 
					getAddressPrediction={this.props.getAddressPrediction}
					selectedAddress={selectedAddress}
					setCurrentAddress={setCurrentAddress}
				/>
			}	
			
			{ (resultType.pickUp || resultType.dropOff) &&
			<SearchResult 
				prediction={this.props.prediction}
			/>
			}	
		</KeyboardAvoidingView>
	);
 }
}

function mapStateToProps(state) {
	return { 
		region: state.location, 
		resultTypes: state.resultTypes,
		prediction: state.prediction,
		selectedAddress: state.selectedAddress,
		fare: state.fare,
		booking: state.booking,
		nearbyDriver: state.nearbyDriver,
		carType: state.carType
	};
}

export default connect(mapStateToProps, { 
	getInput, 
	getCurrentLocation,
	toggleSearchResult, 
	getAddressPrediction,
	getNearbyDrivers,
	setCurrentAddress,
	clearStates,
	calculateFares,
	selectAddressByMarker
	})(MapContainer);


// <Marker 
// 					coordinate={{
// 						latitude: region.latitude,
// 						longitude: region.longitude
// 					}}
// 				>
// 				<View style={styles.talkBubble}>
// 		        	<View style={styles.talkBubbleSquare}>
// 		        		<Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Your Location </Text>
// 		        	</View>
// 		        	<View style={styles.talkBubbleTriangle} />
// 		      	</View>
// 				</Marker>