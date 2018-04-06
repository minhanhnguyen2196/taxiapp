import React from 'react';
import { StyleSheet, Text, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import { View, InputGroup, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNGooglePlaces from 'react-native-google-places';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class Test extends React.Component {
	// componentDidMount() {
	// 	const latitude = 21.1497409;
	// 	const longitude = 79.08747970000002;
	// 	const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCySbsulJzXe-A4EP2NRAGJWCua7p4gaqI';
	// 	fetch(url)
	// 	.then(res => res.json())
	// 	.then(resjson => console.log(resjson.results[0].place_id));
	// }
	constructor(props) {
	  super(props);
	 this.handleSignIn = this.handleSignIn.bind(this);
	}
	componentWillMount() {
		GoogleSignin.hasPlayServices({ autoResolve: true });
		GoogleSignin.configure({
  			webClientId: '1068468207117-45838hq8odpg8ikbhs0k76rqm4omu88m.apps.googleusercontent.com'
		});
		
	}

	handleSignIn() {
		GoogleSignin.signIn()
		.then((user) => {
		  console.log(user.name);
		  this.setState({ user: user });
		})
		.catch((err) => {
		  console.log('WRONG SIGNIN', err);
		})
		.done();
	}
	render() {
	return (
		<View>
			<GoogleSigninButton
			    style={{ width: 48, height: 48 }}
			    size={GoogleSigninButton.Size.Icon}
			    color={GoogleSigninButton.Color.Dark}
			    onPress={() => this.handleSignIn()}
			/>
		</View>
	);
    }
}
//console.log(res.results[0].place_id)