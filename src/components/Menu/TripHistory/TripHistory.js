import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon as BackIcon } from 'native-base';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

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
					<TouchableOpacity style={{ width }}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ color: 'black', fontSize: 16 }}> Yesterday at 10:22 PM </Text>
							<Text style={{ textAlign: 'right', marginHorizontal: 100 }}> 0 VND </Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
							<Text> Huyndai Grand i10 </Text>
							<Text style={{ paddingHorizontal: 20 }}> Pay with cash </Text>
							<Text> Canceled</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View
					style={{
					borderBottomWidth: StyleSheet.hairlineWidth,
					borderBottomColor: 'black',
					width,
					marginTop: 5
					}}
				/>

				<View style={{ margin: 20 }} >
					<TouchableOpacity style={{ width }}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ color: 'black', fontSize: 16 }}> Friday at 9:20 AM </Text>
							<Text style={{ textAlign: 'right', marginHorizontal: 100 }}> 50.000 VND </Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
							<Text> Huyndai Grand i30 </Text>
							<Text style={{ paddingHorizontal: 20 }}> Pay with cash </Text>
							<Text> Completed</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View
					style={{
					borderBottomWidth: StyleSheet.hairlineWidth,
					borderBottomColor: 'black',
					width,
					marginTop: 5
					}}
				/>

				<View style={{ margin: 20 }} >
					<TouchableOpacity style={{ width }}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ color: 'black', fontSize: 16 }}> Monday at 1:22 PM </Text>
							<Text style={{ textAlign: 'right', marginHorizontal: 100 }}> 20.000 VND </Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
							<Text> Huyndai Grand i10 </Text>
							<Text style={{ paddingHorizontal: 20 }}> Pay with cash </Text>
							<Text> Completed</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View
					style={{
					borderBottomWidth: StyleSheet.hairlineWidth,
					borderBottomColor: 'black',
					width,
					marginTop: 5
					}}
				/>
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
