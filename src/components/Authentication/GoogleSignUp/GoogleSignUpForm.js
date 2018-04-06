import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, 
		KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import submitGoogleForm from './submitGoogleForm';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//Validation
const required = value => value ? undefined : 'Required';

const number = value =>
value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const phoneNumber = value =>
value && !/^(01[2689]|09)[0-9]{8}$/i.test(value)
? 'Invalid phone number, must be 10 digits'
: undefined;

const renderField = ({ label, keyboardType, meta: { touched, error }, input: { onChange, ...resInput } }) => {
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


class GoogleSignUpComponent extends React.Component {
	render() {
	const { submitting, handleSubmit } = this.props;
	console.log(`submitting=${submitting}`);
	return (
		<KeyboardAvoidingView style={styles.container}>
			<Animatable.View 
				style={{ margin: 20 }}
				animation='slideInLeft' iterationCount={1}
			>
				<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
					<Icon name='md-arrow-back' style={{ color: 'white' }} />
				</TouchableOpacity>
			</Animatable.View>
			<View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
				<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}> Confirm your information </Text>
			</View>
			<View style={styles.formContainer}>
				<Field 
					keyboardType='default'
					label='Username:'
					component={renderField}
					name='username'
					returnKeyLabel='Next'
					validate={[required]}
				/>
				<Field 
					keyboardType='email-address'
					label='Email:'
					component={renderField}
					name='email'
					returnKeyLabel='Next'
					validate={[required]}
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
						onPress={handleSubmit(submitGoogleForm)}
						style={styles.btnStyle}			
					>
						<Text 
							style={styles.txtStyle}
						>	Submit
						</Text>
					</TouchableOpacity>
				</Animatable.View>
				<Text style={styles.txtAgree}>
					By clicking submit you are agreeing to our terms of use and privacy policy
				</Text>
			</View>
		</KeyboardAvoidingView>
  );
}
}

function mapStateToProps(state, ownProps) {
	const { params } = ownProps.navigation.state;
	return {
      initialValues: {
		username: params.user.name,
		email: params.user.email
    }
	};
}

export default connect(mapStateToProps)(
    reduxForm({
        form: 'form',
        enableReinitialize: true
    })(GoogleSignUpComponent)
 );

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
		marginTop: 15,

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
		backgroundColor: '#ecf0f1',
		marginLeft: 10,
		borderRadius: 6
	},
	label: {
		fontSize: 15, 
		fontWeight: 'bold', 
		width: 80,
		color: 'white'
	},
	btnStyle: {
		alignItems: 'center',
		margin: 10 
	},
	txtStyle: {
		backgroundColor: '#2980b9', 
		color: 'white', 
		fontSize: 18, 
		height: 40, 
		width: 200, 
		textAlign: 'center', 
		padding: 10,		
		borderRadius: 6, 
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
