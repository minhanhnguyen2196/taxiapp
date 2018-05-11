import { Alert } from 'react-native';
import request from '../../.././utils/request';
import saveAccessToken from '../saveAccessToken';
import saveGoogleToken from './saveGoogleToken';

const sha256 = require('js-sha256');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const submitGoogleForm = (values, dispatch, props) => {
	return sleep(1000).then(() => {
		const { params } = props.navigation.state;
		const register = {
			data: {
				username: values.username,
				email: values.email,
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
		})
		.then(() => {
			saveAccessToken('Logged In');
			dispatch({
				type: 'STORE_USER_INFO',
				payload: params.user
			});
		})
		.then(() => {
			saveGoogleToken(params.user.idToken);
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

export default submitGoogleForm;
