import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, 
		KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import * as Animatable from 'react-native-animatable';
import submit from './submitRegister';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//Validation
const required = value => value ? undefined : 'Required';

const maxLength = max => value =>
value && value.length > max ? `Must be ${max} characters or less` : undefined;

const minLength = min => value =>
value && value.length < min ? `Must be ${min} characters or more` : undefined;

const number = value =>
value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const email = value =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
? 'Invalid email address'
: undefined;
///^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/
const phoneNumber = value =>
value && !/^(01[2689]|09)[0-9]{8}$/i.test(value)
? 'Invalid phone number, must be 10 digits'
: undefined;

const renderField = ({ label, keyboardType, secureTextEntry, returnKeyLabel, 
					ref, onSubmit, meta: { touched, error }, input: { onChange, ...resInput } }) => {
	return (
		<View>
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
					ref={ref}
					onSubmitEditing={onSubmit}
					onChangeText={onChange} {...resInput}
				/>
			</Animatable.View>
			{
				touched && (error && 
					<Text style={{ color: 'red', fontSize: 13, textAlignVertical: 'top' }}>
						{error}
					</Text>
				)
			}
		</View>
	);
};


const RegisterComponent = props => {
	const { submitting, handleSubmit } = props;
	console.log(`submitting=${submitting}`);
	return (
			<KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
				<Animatable.Text 
					animation='zoomIn' iterationCount={1}
					style={styles.registerText}
				> Sign Up 
				</Animatable.Text>
				<Field
					keyboardType='default'
					label='Username:'
					component={renderField}
					name='username'
					returnKeyLabel='Next'
					validate={[required, minLength(6), maxLength(20)]}
					// onSubmit={() => this.textinput2.focus()}
					// ref={(input) => this.textinput1 = input}
				/>
				<Field 
					keyboardType='email-address'
					label='Email:'
					component={renderField}
					name='email'
					returnKeyLabel='Next'
					validate={[required, email]}
					// ref={(input) => this.textinput2 = input}
					
				/>
				<Field 
					keyboardType='default'
					label='Password:'
					component={renderField}
					name='password'
					secureTextEntry
					returnKeyLabel='Next'
					validate={[required, minLength(5)]}
				/>
				<Field 
					keyboardType='numeric'
					label='Phone number:'
					component={renderField}
					name='phone_number'
					returnKeyLabel='Go'
					validate={[required, phoneNumber, number]}
				/>
				<Animatable.View
					animation='bounceIn' iterationCount={1}
				>
				<TouchableOpacity
					onPress={handleSubmit(submit)}
					style={styles.btnSubmit}			
				>
					<Text 
						style={styles.txtStyle}
					>	Sign Up Now
					</Text>
				</TouchableOpacity>
				</Animatable.View>
			</KeyboardAvoidingView>
  );
};

const RegisterForm = reduxForm({
  // a unique name for the form
  form: 'form',
})(RegisterComponent);

export default RegisterForm;

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
		fontSize: 19, 
		fontWeight: 'bold', 
		margin: 10, 
		color: 'white'
	},
	input: {
		borderColor: 'steelblue', 
		borderWidth: 1, 
		height: height * 0.05, 
		width: width * 0.55, 
		padding: 5,
		backgroundColor: '#fff',
		marginLeft: 10,
		borderRadius: 6
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
	wrapperSignUp: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	txtSignUp: {
		color: 'white', 
		fontSize: 14, 
		textAlign: 'center', 
		padding: 10,		
		fontWeight: 'bold' 
	},
	txtAgree: {
		color: 'white', 
		fontSize: 12, 	
		fontWeight: 'bold',
		textAlign: 'center',
	}


});
