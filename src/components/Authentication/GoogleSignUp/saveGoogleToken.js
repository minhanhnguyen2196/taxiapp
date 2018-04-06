import { AsyncStorage } from 'react-native';

const saveGoogleToken = async (token) => {
	try {
		await AsyncStorage.setItem('@GoogleToken', token);
	} catch (error) {
		console.log(error);
	}
};

export default saveGoogleToken;