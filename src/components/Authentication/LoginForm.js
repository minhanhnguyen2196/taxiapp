import React from 'react';
import { Text, StyleSheet, TouchableOpacity, 
	KeyboardAvoidingView, Dimensions } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import * as Animatable from 'react-native-animatable';
import submitLogin from './login';
import RenderInput from './RenderInput';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class LoginComponent extends React.Component {
	render() {
		const { handleSubmit } = this.props;
		return (
		<KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
			<Animatable.Text 
				animation='zoomIn' iterationCount={1}
				style={styles.registerText}
			> Sign In
			</Animatable.Text>
			<Field
				focus
				withRef
				refField="username"
				keyboardType='default'
				placeholder='Username'
				component={RenderInput}
				name='username'
				returnKeyLabel='Next'
				onSubmit={() => this.password.getRenderedComponent().refs.password.focus()}
				ref={(input) => this.username = input}
			/>
			<Field
				withRef
				refField="password"
				keyboardType='default'
				placeholder='Password'
				component={RenderInput}
				name='password'
				secureTextEntry
				returnKeyLabel='Next'
				ref={(input) => this.password = input}
			/>
			<Animatable.View
				animation='bounceIn' iterationCount={1}
			>
			<TouchableOpacity
				onPress={handleSubmit(submitLogin)}
				style={styles.btnSubmit}			
			>
				<Text 
					style={styles.txtStyle}
				>	Sign In Now
				</Text>
			</TouchableOpacity>
			</Animatable.View>
		</KeyboardAvoidingView>
);
	}
}

const LoginForm = reduxForm({
  // a unique name for the form
  form: 'form',
})(LoginComponent);

export default LoginForm;

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'flex-start', 
		backgroundColor: '#2c3e50'
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		marginTop: 5,	
	},
	logo: {
		width: 400,
		height: 200
	},
	formContainer: {
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	registerText: {
		textAlign: 'center', 
		fontSize: 18, 
		fontWeight: 'bold', 
		margin: 10,
		color: '#fff'
	},
	input: {
		borderColor: 'steelblue', 
		borderWidth: 1, 
		height: height * 0.05, 
		width: width * 0.55, 
		padding: 5,
		backgroundColor: '#ecf0f1',
		marginLeft: 10
	},
	label: {
		fontSize: 15, 
		fontWeight: 'bold', 
		width: 80,
		color: 'white'
	},
	btnSubmit: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40, 
		width: 300,
		backgroundColor: '#2980b9',
		borderRadius: 20,
		margin: 20
	},
	txtStyle: {
		color: 'white', 
		fontSize: 18, 
		textAlign: 'center', 
		fontWeight: 'bold' 
	},

});
