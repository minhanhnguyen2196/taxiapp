import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, FooterTab, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

//const taxiLogo = require('../../assets/img/taxi_logo_white.png');

const tabs = [{
		title: 'TaxiCar',
		subTitle: '',
		icon: 'car'
	},
	{
		title: 'TaxiShare',
		subTitle: '',
		icon: 'car'
	},
	{
		title: 'Premium',
		subTitle: '',
		icon: 'car'
	},
	{
		title: 'TaxiBike',
		subTitle: '',
		icon: 'car'
	}];

export default class FooterComponent extends React.Component {
	render() {
		return (
			<Footer>
				<FooterTab style={styles.footerContainer} >
				{
					tabs.map((obj, index) => (
							<Button key={index}>
								<Icon size={20} name={obj.icon} color={(index === 0) ? '#FF5E3A' : 'grey'} />
								<Text style={{ fontSize: 12, color: (index === 0) ? '#FF5E3A' : 'grey' }}>{obj.title}</Text>
								<Text style={styles.subText}>{obj.subTitle}</Text>
							</Button>
						)
					)
				}
				</FooterTab>
			</Footer>
		);
	}
}

const styles = StyleSheet.create({
	footerContainer: {
		backgroundColor: '#fff',
	},
	subText: {
		fontSize: 8
	}
});