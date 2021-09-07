import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { View, Button } from 'native-base';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { phonecall, text } from 'react-native-communications';
import styles from './styles';

const driver = require('../../../assets/img/driver.png');

const DriverProfile = ({ driverInfo }) => {
	const { rating, phone } = driverInfo;
	return (
		<View style={styles.footerContainer}>
			<View style={styles.imageContainer}>
				<Image 
					style={styles.driverPic} 
					source={driver} 
				/> 
			</View>
			<View style={styles.ratingContainer}>
				<Text>{driverInfo.lastName} {driverInfo.firstName} </Text>
				<StarRating
					starSize={20}
					disabled={true}
					maxStars={5}
					rating={rating}
					fullStarColor={'yellow'}
				/>
			</View>
			<TouchableOpacity 
				style={styles.iconContainer}
				onPress={() => phonecall(phone, true)}
			>
				<Icon name="phone" size={30} style={styles.icon} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => text(phone, '')}
				style={styles.iconContainer}
			>
				<Icon name="comment-o" size={30} style={styles.icon} />
			</TouchableOpacity>
		</View>

	);
};

export default DriverProfile;