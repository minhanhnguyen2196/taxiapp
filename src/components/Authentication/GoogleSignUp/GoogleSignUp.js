import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, Icon } from 'native-base';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import getGoogleToken from './getGoogleToken';
import saveAccessToken from '../saveAccessToken';

import { getUserInfo } from '../../../redux/actionCreators';

class GoogleSignUp extends React.Component {
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
			getGoogleToken()
			.then(res => {
				console.log(res);
				if (user.idToken === res) {
				saveAccessToken('Logged In');
				this.props.getUserInfo(user);
				this.props.navigation.navigate('App');	
			} else {
				this.props.navigation.navigate('SignUpForm', { user });
			}	
		});
		})
		.catch((err) => {
			console.log('WRONG SIGNIN', err);
		})
		.done();
	}
	render() {
	return (
		<View style={styles.container}>
			<Animatable.View 
				style={{ margin: 20 }}
				animation='slideInLeft' iterationCount={1}
			>
				<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
					<Icon name='md-arrow-back' style={{ color: 'black' }} />
				</TouchableOpacity>
			</Animatable.View>
			<View style={styles.txtWrapperStyle}> 
				<Text style={styles.txtStyle}>Choose your account</Text>
			</View>
			<View style={{ padding: 20, flexDirection: 'row' }}>
				<GoogleSigninButton
					style={{ width: 60, height: 60 }}
					size={GoogleSigninButton.Size.Icon}
					color={GoogleSigninButton.Color.Dark}
					onPress={() => this.handleSignIn()}
				/>
				<Text style={styles.txtGoogleStyle}> Google </Text>
			</View>
		</View>
	);
    }
}


function mapStateToProps(state) {
	return { 
		userInfo: state.userInfo
	};
}

export default connect(mapStateToProps, { getUserInfo })(GoogleSignUp);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	txtWrapperStyle: {
		marginTop: 50, marginLeft: 20
	},
	txtStyle: {
		color: 'black', 
		fontSize: 18, 
		textAlign: 'left',
		padding: 20,		
		fontWeight: 'bold' 
	},
	txtGoogleStyle: {
		alignItems: 'center', 
		fontSize: 16, 
		fontWeight: 'bold', 
		justifyContent: 'center', 
		paddingTop: 10
	}

});