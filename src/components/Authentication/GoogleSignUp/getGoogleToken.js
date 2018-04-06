import { AsyncStorage } from 'react-native';

const getGoogleToken = async () => {
	try {
		const value = await AsyncStorage.getItem('@GoogleToken');
		if (value !== null) {
			return value;
		}
		return null;
	} catch (error) {
		console.log(error);
	}	
};

export default getGoogleToken;