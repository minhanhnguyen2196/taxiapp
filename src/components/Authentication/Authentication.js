import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

class Authentication extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { toggle: true };
		this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
	}

	handleToggleSwitch = () => {
		this.setState({ toggle: !this.state.toggle });
	}

	render() {
		const register = (<RegisterForm navigation={this.props.navigation} />);
		const login = (<LoginForm navigation={this.props.navigation} />);
		const main = this.state.toggle ? register : login;
		return (
			<View style={styles.container}>
				{main}
				<View style={styles.wrapperControl}>
					<TouchableOpacity
						onPress={this.handleToggleSwitch}
						style={styles.btnSignUp}      
					>
						<Text style={this.state.toggle ? styles.activeTxtStyle : styles.inActiveTxtStyle}> 
							Sign Up
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.handleToggleSwitch}
						style={styles.btnSignIn}      
					>
						<Text style={this.state.toggle ? styles.inActiveTxtStyle : styles.activeTxtStyle}> 
							Sign In
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}> 
					<TouchableOpacity 
						style={styles.wrapperSignUp} 
						onPress={() => this.props.navigation.navigate('GoogleSignUp')} 
					>
						<Text style={styles.txtSignUp}> Or connect with your social account</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Authentication;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2c3e50',
		padding: 10,
	},
	btnSignIn: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40, 
		width: 150,
		backgroundColor: '#fff',
		paddingVertical: 20,
		borderBottomRightRadius: 20,
		borderTopRightRadius: 20,
		marginLeft: 1
	},
	btnSignUp: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40, 
		width: 150,
		backgroundColor: '#fff',
		paddingVertical: 20,
		borderBottomLeftRadius: 20,
		borderTopLeftRadius: 20,
		marginRight: 1
	},
	wrapperSignUp: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	txtSignUp: {
		color: 'white', 
		fontSize: 14, 
		textAlign: 'center',    
		fontWeight: 'bold' 
	},
	activeTxtStyle: {
		color: '#2c3e50', 
		fontSize: 18, 
		textAlign: 'center', 
	},
	inActiveTxtStyle: {
		color: 'grey', 
		fontSize: 18, 
		textAlign: 'center', 
	},
	wrapperControl: {
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center', 
		margin: 20
	}
});