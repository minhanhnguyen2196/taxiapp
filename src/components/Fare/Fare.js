import React from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

class Fare extends React.Component {
	render() {
		return (
			<View style={styles.fareContainer}>
				<Text>
					<Text style={styles.fareText}> FARE: RM </Text> 
					<Text style={styles.amount}>{this.props.fare} </Text>
				</Text>
				
			</View>
		);
	}
}

function mapStateToProps(state) {
	return { 
		fare: state.fare
	};
}

export default connect(mapStateToProps)(Fare); 

const styles = StyleSheet.create({
	fareContainer: {
        width,
        height: 40,
        padding: 10,
        backgroundColor: 'grey'
    },
    fareText: {
        fontSize: 12
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 12
    }
});