import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon as BackIcon } from 'native-base';
import * as Animatable from 'react-native-animatable';

export default class TripHistory extends React.PureComponent {
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
					<Text style={{ color: '#fff', fontSize: 20, padding: 20 }}> Trip History </Text>
				</View>
				<View style={{ margin: 20 }} >
					<TouchableOpacity>
						<View style={{ flexDirection: 'row' }}>
							<Text> Yesterday at 10:22 PM </Text>
							<Text> 0 VND </Text>
						</View>
						<Text> Huyndai Grand i10 </Text>
						<View style={{ flexDirection: 'row' }}>
							<Text> Pay with cash </Text>
							<Text> Canceled</Text>
						</View>
						<Text> Detail </Text>
					</TouchableOpacity>
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
