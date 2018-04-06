import { Alert } from 'react-native';
import request from '../.././utils/request';
import saveAccessToken from './saveAccessToken';

const sha256 = require('js-sha256');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const submit = (values, dispatch, props) => {
	return sleep(1000).then(() => {
		console.log('OK');
		const register = {
			data: {
				username: values.username,
				email: values.email,
				password: sha256(String(values.password)),
				phone: values.phone_number
			}	
		};
		request.post('http://192.168.1.110:3000/api/register')
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
		})
		.then(() => {
			saveAccessToken(sha256(String(values.password)));
			dispatch({
				type: 'STORE_USER_INFO',
				payload: register.data
			});
		})
		.then(() => {
			Alert.alert(
				'Thank you',
				'Sign up successfully!',
				[
					{ text: 'OK', onPress: () => props.navigation.navigate('App') } 
				],
				{ cancelable: false }
			);
		})
		.catch(err => console.log(err));
	});
};

export default submit;
