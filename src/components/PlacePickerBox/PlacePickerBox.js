import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { setCurrentAddress } from '../../redux/actionCreators'; 

class PlacePickerBox extends React.Component {
	handleOnPress = () => {
		this.props.setCurrentAddress();
	    this.props.navigation.navigate('Home');
	}
	render() {
	return (
		<Animatable.View 
			animation='fadeInDown' iterationCount={1}
			style={styles.container}
		>
			<Text style={styles.label}>Welcome</Text>
			<TouchableOpacity 
				onPress={() => this.handleOnPress()}
				style={styles.btn}
			>
				<Text style={styles.txt}> Where do you want to go? </Text>
			</TouchableOpacity>
		</Animatable.View>
	);
    }
}

function mapStateToProps(state) {
	return { 
		region: state.location, 
	};
}

export default connect(mapStateToProps, { 
	setCurrentAddress, 
	})(PlacePickerBox);
