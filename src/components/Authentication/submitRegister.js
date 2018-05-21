import { Alert } from 'react-native';
import SmsAndroid from 'react-native-sms-android';
import request from '../.././utils/request';
import saveAccessToken from './saveAccessToken';

const sha256 = require('js-sha256');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const submit = (values, dispatch, props) => {
	return sleep(1000).then(() => {
		const register = {
			data: {
				username: values.username,
				email: values.email,
				password: sha256(String(values.password)),
				phone: values.phone_number
			}	
		};
		request.post('https://gettaxiapp.herokuapp.com/api/register')
		.send(register)
		.then((res) => {
			console.log(res.body);
			if (res.body.error) {
				Alert.alert(
				'Error',
				'Register failed! Phone number already used',
				[
					{ text: 'Register again', onPress: () => console.log('OK pressed') }  
				],
				{ cancelable: false }
			);
				return Promise.reject(new Error('Fail!'));
			}
			saveAccessToken(res.body.token);
			dispatch({
				type: 'STORE_USER_INFO',
				payload: res.body.user
			});
		})
		.then(() => {
			SmsAndroid.sms(
				'0913710766', // phone number to send sms to
				'Your validation code is 2311', // sms body
				'sendDirect', // sendDirect or sendIndirect
				(err, message) => {
				if (err) {
					console.log('error');
				} else {
					console.log(message); // callback message
				}
				}
			);
			Alert.alert(
				'Thank you for registering',
				'A validation code has been sent to you',
				[
					{ text: 'OK', onPress: () => props.navigation.navigate('ValidationCode') } 
				],
				{ cancelable: false }
			);
		})
		.catch(err => console.log(err));
	});
};

export default submit;
