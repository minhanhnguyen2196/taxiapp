import React from 'react';
import { Text } from 'react-native';
import { View, Button } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { cancelBooking } from '../../redux/actionCreators';
import styles from './styles.js';

var Spinner = require('react-native-spinkit');

class FoundDriverScreen extends React.PureComponent {
	render() {
		const { selectedPickUp, selectedDropOff } = this.props.selectedAddress;
		return (
		<View style={styles.container} >
			<Spinner style={{ paddingVertical: 200, margin: 20 }} isVisible size={150} type="Pulse" color="#ffffff" />
			<View style={styles.content}>
				<Text style={styles.text}> Processing your request</Text>
				<Icon style={styles.locationIcon} name="map-marker" />

				<View style={styles.pickup}>
					<Text>{ selectedPickUp.name }</Text>
				</View>
				<Icon style={styles.toArrow} name="long-arrow-down" />
				<View style={styles.dropoff}>
					<Text>{ selectedDropOff.name }</Text>
				</View>

				<View style={styles.cancelBtnWrapper}>
					<Button 
						style={styles.cancelBtn} 
						onPress={() => this.props.cancelBooking()} 
					>
						<Text style={styles.cancelBtnText}>Cancel</Text>
					</Button>
				</View>
				
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

export default connect(mapStateToProps, { cancelBooking })(FoundDriverScreen);
