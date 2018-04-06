import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  AsyncStorage,
  View,
  Image
} from 'react-native';
import getAccessToken from './getAccessToken';
import getGoogleToken from './GoogleSignUp/getGoogleToken';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
	sleep(1000)
	.then(() => getAccessToken())
	.then(res => this.props.navigation.navigate(res ? 'App' : 'Auth'));
	//this._signOutAsync();
  }

  _signOutAsync = async () => {
    //removeItem('@accessToken')
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/img/react_icon.png')} />
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e'
	},
  backgroundImage: {
    
  }
});