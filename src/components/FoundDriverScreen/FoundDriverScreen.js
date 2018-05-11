import React from 'react';
import { Text, Dimensions, Image } from 'react-native';
import { View, Button } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { updateTripStatus, clearStates } from '../../redux/actionCreators';
import styles from './styles.js';

var Spinner = require('react-native-spinkit');
const { width, height } = Dimensions.get('window');

class FoundDriverScreen extends React.PureComponent {
	render() {
		const { selectedPickUp, selectedDropOff } = this.props.selectedAddress;
		return (
		<View style={styles.container} >
			<View style={{ width, height: height * 0.05, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>  
                <Text style={styles.text}> Processing your request </Text>
            </View>

            <View style={styles.content}>
            	<Spinner isVisible size={250} type="Circle" color="#7f8c8d" />
            	<View style={{ position: 'absolute', paddingBottom: 100 }}>
	            	<Image 
						source={require('../../assets/img/download.png')}
						style={{ height: 100, width: 100 }}
					/>
				</View>
				
				<View style={{ margin: 20, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}> Please wait </Text>
					<Text style={{ fontSize: 16, color: 'black' }}> We are searching for your driver </Text>
				</View>
			</View>
			
			<View style={styles.cancelBtnWrapper}>
				<Button 
					style={styles.cancelBtn} 
					onPress={() => {
						this.props.updateTripStatus('cancel');
						this.props.clearStates();
					}} 
				>
					<Text style={styles.cancelBtnText}>Cancel</Text>
				</Button>
			</View>
		</View>

	);
	}
}

// { selectedPickUp.name} // { selectedDropOff.name}
function mapStateToProps(state) {
	return { 
		myRegion: state.location, 
		inputData: state.inputData,
		resultTypes: state.resultTypes,
		prediction: state.prediction,
		selectedAddress: state.selectedAddress,
		distanceMatrix: state.distanceMatrix,
		fare: state.fare,
		booking: state.booking,
		nearbyDriver: state.nearbyDriver,
		clicked: state.clicked,
	};
}

export default connect(mapStateToProps, { updateTripStatus, clearStates })(FoundDriverScreen);


// <View style={{ margin: 10, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
// 					<Text style={{ color: '#f1c40f', fontSize: 16 }}> PICK UP LOCATION </Text>
// 				</View>
// 				<View style={styles.pickup}>
// 					<Icon style={styles.locationIcon} name="map-marker" />
// 					<Text>{ selectedPickUp.name }</Text>
// 				</View>
// 				<View style={{ margin: 10, marginTop: 20 }}>
// 					<Text style={{ color: '#f1c40f', fontSize: 16 }}> DROP OFF LOCATION </Text>
// 				</View>
// 				<View style={styles.dropoff}>
// 					<Icon style={styles.locationIcon} name="flag" />
// 					<Text>{ selectedDropOff.name }</Text>
// 				</View>

// <View>
// 				<Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}> PICK UP LOCATION </Text>
// 				<View style={styles.pickup}>
// 					<Icon style={styles.locationIcon} name="map-marker" />
// 					<Text style={{ fontSize: 15 }}>{ selectedPickUp.name}</Text>
// 				</View>
// 			</View>
// 			<View>
// 				<Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}> DROP OFF LOCATION </Text>
// 				<View style={styles.dropoff}>
// 					<Icon style={styles.locationIcon} name="flag" />
// 					<Text style={{ fontSize: 15 }}>{ selectedDropOff.name}</Text>
// 				</View>
// 			</View>