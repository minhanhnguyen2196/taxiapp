import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const taxi = require('../.././assets/img/taxi-128.png');
const { width, height } = Dimensions.get('window');

export default class StartScreen extends React.PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<Animatable.View
					animation='fadeInDownBig' iterationCount={1} 
					style={{ paddingBottom: 80, justifyContent: 'center', alignItems: 'center' }}
				>
					<Image source={taxi} />
					<Text style={styles.text}>Taxi App </Text>
				</Animatable.View>
				<Animatable.View
					animation='fadeInLeft' iterationCount={1}  
					style={{ paddingBottom: 20 }}
				>
				<TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('LoginForm')}>
					<Text style={styles.btnText}> Sign In </Text> 
				</TouchableOpacity>
				</Animatable.View>
				<Animatable.View
					animation='fadeInRight' iterationCount={1} 
				>
				<TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Authentication')}>
					<Text style={styles.btnText}> Register </Text> 
				</TouchableOpacity>
				</Animatable.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e67e22'
	},
	wrapper: {
		margin: 40,
		padding: 20,
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		paddingTop: 150
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		height: height * 0.06, 
		width: width * 0.8,
		padding: 20,
		paddingBottom: 20,
		borderRadius: 20,
		backgroundColor: '#fff',

	},
	btnText: {
		fontSize: 20,
		fontFamily: 'italic',
		color: 'black'
	},
	text: {
		fontSize: 30, 
		color: '#fff', 
		fontWeight: 'bold', 
		fontFamily: 'italic', 
	}
});