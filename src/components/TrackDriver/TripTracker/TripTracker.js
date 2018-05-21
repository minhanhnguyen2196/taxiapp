import React from 'react';
import { Text } from 'react-native';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles.js';

export default class TripTracker extends React.Component {
	
	render() {
		const { vehicle } = this.props.driverInfo;
		const { duration } = this.props.distanceFromDriver.rows[0].elements[0];
		return (
		<View style={styles.footerContainer}>
			<View style={styles.iconContainer}>
				<Icon name="window-minimize" style={styles.icon} />
				<Text style={styles.onWayText}>{(duration.value < 100) ? '' : 'Your driver is on the way'}</Text>
				<Text style={styles.distanceText}>{(duration.value < 100) ? 'Your driver has arrived!!!' : duration.text}</Text>
				<Text style={styles.vehicleText}>{vehicle && vehicle.plateNumber} {vehicle && vehicle.model}</Text>
			</View>
		</View>
	);
	}	
}
