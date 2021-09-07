import React from 'react';
import { Text, Image } from 'react-native';
import { View, Button } from 'native-base';
import StarRating from 'react-native-star-rating';
import styles from './styles';

const driver = require('../../../assets/img/driver.png');

export default class FoundDriverScreen extends React.Component {
	render() {
		const { driverInfo } = this.props;
		const { vehicle } = driverInfo;
		return (
		<View style={styles.findDriverContainer}>
			<View style={styles.content}>
				<Text style={styles.driverFoundText}>Driver Found</Text>
				<Image resizemode="contain" style={styles.driverPic} source={driver} />
				<View style={styles.driverInfo}>
					<View style={styles.driverBio}>
						<Text style={styles.nameText}>
							{driverInfo.firstName} {driverInfo.lastName}
						</Text>
						<Text style={styles.bioText}>
							0.2 km away.
						</Text>
						<StarRating
							starStyle={{ padding: 5 }}
							starSize={30}
							disabled={true}
							maxStars={5}
							rating={5}
							fullStarColor={'yellow'}
						/>
					</View>
				</View>
				<View style={styles.vehicleDetails}>
					<Text style={styles.vehicleText}>Vehicle Plate number:</Text>
					<Text style={styles.vehicleNumber}> {vehicle && vehicle.plateNumber}</Text>
					<Button 
						style={styles.nextBtn} 
						onPress={() => {
							this.props.getDriverLocation();
						}}
					>
						<Text style={styles.nextBtnText}>NEXT</Text>
					</Button>
				</View>
			</View>
		</View>
	);
	}	
}


// var interVal = setInterval(() => {
// 							if (!driverInfo) { clearInterval(interVal); alert('OK'); }
						 	
// 						 }, 1000);