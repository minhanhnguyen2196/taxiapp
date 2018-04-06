import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon as BackIcon } from 'native-base';
import * as Animatable from 'react-native-animatable';

export default class PayWithCash extends React.PureComponent {
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={{ backgroundColor: 'black' }}>
					<Animatable.View 
						style={{ margin: 20 }}
						animation='slideInLeft' iterationCount={1}
					>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<BackIcon name='md-arrow-back' style={{ color: 'white' }} />
						</TouchableOpacity>
					</Animatable.View>
					<Text style={{ color: '#fff', fontSize: 20, padding: 20 }}> Pay With Cash </Text>
				</View>
				<View style={{ margin: 20 }} >
					<Text style={{ fontSize: 16, fontWeight: '600' }}> Pay your ride with cash </Text>
					<Text style={{ paddingTop: 20 }}>
						When a trip ends, the payment method selected for your trip is immediately charged.
						A receipt is emailed to you, and 
						your account's trip history is updated with details about the route and fare
					</Text>
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
