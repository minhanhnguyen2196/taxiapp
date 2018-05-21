import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Icon as BackIcon } from 'native-base';
import * as Animatable from 'react-native-animatable';

import { setPayment } from '../../../redux/actionCreators';

 class PaymentScreen extends React.PureComponent {
	constructor(props) {
		super(props);
		BackHandler.addEventListener('hardwareBackPress', this.onBackHandle);
	}

	onBackHandle = () => {
    this.props.navigation.navigate('Home');
    return true;
  }
	render() {
		const { payment } = this.props;
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
					<Text style={styles.text}> Select how you would like to pay </Text>
					<TouchableOpacity 
						style={(payment === 'Cash') ? styles.btnCash : styles.btnNormal}
						onPress={() => this.props.setPayment('Cash')}
					>
						<Icon name='money' style={styles.icon} />
						<Text style={{ fontSize: 16, padding: 10, color: '#fff' }}>Cash </Text>
					</TouchableOpacity>
					<TouchableOpacity 
						onPress={() => this.props.setPayment('Card')}
						style={(payment === 'Cash') ? styles.btnNormal : styles.btnCard}
					>
						<Icon name='credit-card' style={styles.icon} />
						<Text style={{ fontSize: 16, padding: 10, color: '#fff' }}>Credit Card </Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}
					>
						<Icon name='plus-circle' style={{ fontSize: 28, padding: 10, color: 'black' }} />
						<Text style={{ fontSize: 16, padding: 10, color: 'black' }}>More options</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	icon: {
		fontSize: 28,
		padding: 10,
		color: '#fff'
	},
	btnCash: {
		flexDirection: 'row',
		backgroundColor: '#34495e',
		borderBottomWidth: 1,
		borderBottomColor: '#fff',
	},
	btnNormal: {
		flexDirection: 'row',
		backgroundColor: '#95a5a6',
		borderBottomWidth: 1,
		borderBottomColor: '#fff',
	},
	btnCard: {
		flexDirection: 'row',
		backgroundColor: '#34495e',
	},
	text: {
		padding: 10,
		fontSize: 16,
		color: 'black'
	}
});

function mapStateToProps(state) {
	return { 
		payment: state.payment
	};
}
export default connect(mapStateToProps, { setPayment })(PaymentScreen);
