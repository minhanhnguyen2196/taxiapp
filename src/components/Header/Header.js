import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { Header, Left, Body, Button, Right, Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const taxiLogo = require('../../assets/img/taxi_logo_white.png');

export default class HeaderComponent extends React.PureComponent {
	constructor(props) {
	  super(props);
	
	  this.state = { headerText: 'Book Your Ride' };
	}
	render() {
		return (
			<Header style={styles.header} >
				<Left> 
					<Button onPress={() => this.props.navigation.navigate('DrawerOpen')} transparent >
						<Icon name='bars' style={styles.icon} />
					</Button>
				</Left>
				<Body style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingLeft: 50, flexDirection: 'row' }}>
					<Icon name="taxi" style={styles.icon} />
					<Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}> Book Your Ride </Text>
				</Body>
				<Right> 
					<Button transparent >
						<Icon name='gift' style={styles.icon} />
					</Button>
				</Right>
			</Header>
		);
	}
}

const styles = StyleSheet.create({
	icon: {
		color: '#FFF',
		fontSize: 28,
		padding: 5
	},
	headerText: {
		color: 'white',
		fontSize: 14
	},
	logo: {
		width: 58,
		height: 20
	},
	header: {
		backgroundColor: '#e67e22', 
		justifyContent: 'space-between', 
		alignItems: 'center' 
	}
});