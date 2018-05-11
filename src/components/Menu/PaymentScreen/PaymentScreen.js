import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon as BackIcon } from 'native-base';
import * as Animatable from 'react-native-animatable';

export default class PaymentScreen extends React.PureComponent {
	constructor(props) {
		super(props);
		BackHandler.addEventListener('hardwareBackPress', this.onBackHandle);
	}

	onBackHandle = () => {
    this.props.navigation.navigate('Home');
    return true;
  }
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={{ backgroundColor: 'black' }}>
					<Animatable.View 
						style={{ margin: 20 }}
						animation='slideInLeft' iterationCount={1}
					>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
							<BackIcon name='md-arrow-back' style={{ color: 'white' }} />
						</TouchableOpacity>
					</Animatable.View>
					<Text style={{ color: '#fff', fontSize: 20, padding: 20 }}> Payment Method </Text>
				</View>
				<View style={{ margin: 20 }} >
					<View style={{ flexDirection: 'row' }} >
						<Icon name='money' style={styles.icon} />
						<TouchableOpacity onPress={() => this.props.navigation.navigate('PayWithCash')}>
							<Text style={{ fontSize: 16, padding: 10 }}>Cash </Text>
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: 'row' }} >
						<Icon name='credit-card' style={styles.icon} />
						<Text style={{ fontSize: 16, padding: 10 }}>Credit Card </Text>
					</View>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	icon: {
		fontSize: 28,
		padding: 10
	},
});
