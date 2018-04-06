import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { Header, Left, Body, Button, Right, Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const taxiLogo = require('../../assets/img/taxi_logo_white.png');

export default class HeaderComponent extends React.PureComponent {
	render() {
		return (
			<Header style={styles.header} >
				<Left style={{ flex: 1 }}> 
					<Button onPress={() => this.props.navigation.navigate('DrawerOpen')} transparent >
						<Icon name='bars' style={styles.icon} />
					</Button>
				</Left>
				<Body style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
					<Image source={taxiLogo} style={styles.logo} />
				</Body>
				<Right style={{ flex: 1 }}> 
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
		fontSize: 28
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
		backgroundColor: '#34495e', 
		justifyContent: 'space-between', 
		alignItems: 'center' 
	}
});