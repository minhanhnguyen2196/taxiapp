import { Alert } from 'react-native';
import request from '../.././utils/request';
import saveAccessToken from './saveAccessToken';

const sha256 = require('js-sha256');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const submitLogin = (values, dispatch, props) => {
	return sleep(1000).then(() => {
		console.log('OK');
		const login = {
			data: {
				username: values.username,
				password: sha256(String(values.password)),
			}	
		};
		request.post('http://192.168.1.110:3000/api/login')
		.send(login)
		.then((res) => {
			console.log(res.body);
			if (res.body.error) {
				Alert.alert(
				'Error',
				'Login failed! Incorrect username or password',
				[
					{ text: 'Try again', onPress: () => console.log('OK pressed') }  
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
				payload: login.data
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

export default submitLogin;
