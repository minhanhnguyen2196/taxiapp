import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  AsyncStorage,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import getAccessToken from './getAccessToken';
import checkLogin from './checkLogin';

import { getUserInfo } from '../../redux/actionCreators';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
	sleep(1000)
	.then(() => getAccessToken())
	.then((token) => checkLogin(token))
  .then((res) => {
    if (res.error) {
      this.props.navigation.navigate('Auth');
    } else {
      this.props.getUserInfo(res);
      this.props.navigation.navigate('App');
    }
  })
  .catch(err => console.log(err));
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

function mapStateToProps(state) {
  return { 
    userInfo: state.userInfo
  };
}
export default connect(mapStateToProps, { getUserInfo })(AuthLoadingScreen);
