import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, 
	KeyboardAvoidingView, Dimensions } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import * as Animatable from 'react-native-animatable';
import submitLogin from './login';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const renderField = ({ label, keyboardType, secureTextEntry, returnKeyLabel, input: { onChange, ...resInput } }) => {
	return (
		<Animatable.View 
			animation='zoomIn' iterationCount={1}
			style={{ flexDirection: 'row', height: 58, alignItems: 'center', justifyContent: 'center' }}
		>
			<Text style={styles.label}>{label}</Text>
			<TextInput 
				style={styles.input}
				keyboardType={keyboardType}
				underlineColorAndroid='transparent'
				secureTextEntry={secureTextEntry}
				returnKeyLabel={returnKeyLabel}
				onChangeText={onChange} {...resInput}
			/>
		</Animatable.View>
	);
};


const LoginComponent = props => {
	const { submitting, handleSubmit } = props;
	console.log(`submitting=${submitting}`);
	return (
			<KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
				<Animatable.Text
					animation='flipInX' iterationCount={1}
					style={styles.registerText}
				> SIGN IN
				</Animatable.Text>
				<Field 
					keyboardType='default'
					label='Username:'
					component={renderField}
					name='username'
					returnKeyLabel='Next'
				/>
				<Field 
					keyboardType='default'
					label='Password:'
					component={renderField}
					name='password'
					secureTextEntry
					returnKeyLabel='Next'
				/>
				<Field 
					keyboardType='default'
					label='Re-Enter Password:'
					component={renderField}
					name='re-password'
					secureTextEntry
					returnKeyLabel='Next'
				/>
				<Animatable.View
					animation='bounceIn' iterationCount={1}
				>
				<TouchableOpacity
					style={styles.btnSubmit}
					onPress={handleSubmit(submitLogin)}
				>
					<Text 
						style={styles.txtStyle}
					>	Sign In Now
					</Text>
				</TouchableOpacity>
				</Animatable.View>
			</KeyboardAvoidingView>
  );
};

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
		margin: 20,
		paddingLeft: 10,
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
