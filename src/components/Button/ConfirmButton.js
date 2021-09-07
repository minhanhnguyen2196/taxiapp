import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export default class ConfirmButton extends React.Component {
	render() {
		return (
		<View style={styles.container} >
			<TouchableOpacity 
				style={styles.confirmBtn}
				onPress={() => this.props.calculateFares()}
			>
				<Text style={styles.confirmTxt}>Confirm</Text>
			</TouchableOpacity>
		</View>

	);
	}
}

//{this.props.booking.pickUp.name} //{this.props.booking.dropOff.name}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        position: 'absolute',
        bottom: 20, 
        left: 20, 
        right: 20,
        borderRadius: 6,
        flex: 1,
    },
    confirmTxt: {
        color: 'white', 
        textAlign: 'center', 
        padding: 10, 
        borderRadius: 6, 
        fontWeight: 'bold'
    },
    confirmBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 20,
        width: width * 0.9,
        height: 50,
        backgroundColor: '#e67e22',
        borderRadius: 6
    }
});