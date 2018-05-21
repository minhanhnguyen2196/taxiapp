import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        position: 'absolute',
        bottom: 20, 
        left: 20, 
        right: 20
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
        width: 350, 
        height: 40, 
        backgroundColor: 'black', 
    }
});