import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { setCurrentAddress } from '../../redux/actionCreators'; 

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class PlacePickerBox extends React.Component {
	constructor(props) {
		super(props);
		this.handleOnPress = this.handleOnPress.bind(this);
	}
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
			<TouchableOpacity 
				onPress={() => this.handleOnPress()}
				style={styles.btn}
			>
				<Icon name='search' style={{ fontSize: 22, padding: 5 }} />
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        top: 100,
        width: width * 0.9,
        height: height * 0.08,
        margin: 10,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        elevation: 8,
        left: 10
	},
    btn: {
        backgroundColor: 'white',
        alignItems: 'center',
        margin: 10,
        borderRadius: 6,
        flexDirection: 'row'
    },
    viewWrapper: {
        backgroundColor: '#fff', 
        borderRadius: 7, 
        width: 0.95 * width, 
        marginLeft: 5,
        marginRight: 5,
        marginTop: 18,
        marginBottom: 0

    },
    txt: {
        color: 'black',
        fontSize: 15
    },
    label: {
        fontSize: 18,
        color: '#fff',
        fontStyle: 'italic',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    map: {
		...StyleSheet.absoluteFillObject,
	}
});