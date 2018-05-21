import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, BackHandler, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import removeAccessToken from '../Authentication/removeToken';

const { width } = Dimensions.get('window');

class Menu extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    BackHandler.addEventListener('hardwareBackPress', this.onBackHandle);
  }
  signOut() {
    removeAccessToken()
    .then(() => this.props.navigation.navigate('Auth'));
  }

	render() {
	const { userInfo } = this.props;
	return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'black', alignItems: 'center', width }}>
        <Image 
          source={require('../../assets/img/profile.jpg')} 
          style={styles.profile}
        />  
        <View style={{ alignItems: 'center', margin: 10 }}>
          <Text style={{ color: 'white', fontSize: 18 }}>
          {userInfo.personalInfo.username}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ paddingLeft: 10, margin: 5 }}>
          <TouchableOpacity
            style={styles.btnSignInStyle}
            onPress={() => { this.props.navigation.navigate('TripHistory'); }}
          >
            <Icon name='history' style={styles.icon} color='black' />
            <Text style={styles.textStyle}>Trip History </Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: 'black',
              width,
              marginTop: 5
            }}
          />
        </View>
          <View style={{ paddingLeft: 10, margin: 10 }}>
            <TouchableOpacity
              style={styles.btnSignInStyle}
              onPress={() => { this.props.navigation.navigate('PaymentScreen'); }}
            >
              <Icon name='money' style={styles.icon} color='black' />
              <Text style={styles.textStyle}>Payment Method</Text>
            </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: 'black',
                  width,
                  marginTop: 5
                }}
              />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <TouchableOpacity
              style={styles.btnSignInStyle}
              onPress={() => this.signOut()}
            >
              <Icon name='sign-out' style={styles.icon} color='black' />
              <Text style={styles.textStyle}>Sign Out</Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: 'black',
                width,
              }}
            />
          </View>
      </View>
      <View style={{ flex: 1, backgroundColor: '#e1e3e8', width }} />
    </View> 
    );
	}   
}

function mapStateToProps(state) {
	return { 
		userInfo: state.userInfo
	};
}

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderRightWidth: 1,
      alignItems: 'center'
    },
    profile: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginTop: 20,
      marginBottom: 20,
      margin: 5
    },
    btnStyle: {
      height: 50,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
},
    textStyle: {
      color: 'black',
      fontSize: 15, 
    },
    btnSignInStyle: {
      height: 50,
      width,
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: 80
    },
    icon: {
    fontSize: 35,
    padding: 10
  },


});


 // <View style={{ marginTop: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
 //                  <TouchableOpacity
 //                    style={styles.btnSignInStyle}
 //                    onPress={() => { this.props.navigation.navigate('TripHistory'); }}
 //                  >
 //                      <Text style={styles.textStyle}>Trip History </Text>
 //                  </TouchableOpacity>
 //                  <View
 //                    style={{
 //                      borderBottomWidth: StyleSheet.hairlineWidth,
 //                      borderBottomColor: 'black',
 //                      width,
 //                      margin: 5
 //                    }}
 //                  />
 //                  <TouchableOpacity 
 //                        style={styles.btnSignInStyle} 
 //                        onPress={() => { this.props.navigation.navigate('PaymentScreen'); }}
 //                  >
 //                      <Text style={styles.textStyle}>Payment Method </Text>
 //                  </TouchableOpacity> 

 //                  <TouchableOpacity style={styles.btnSignInStyle} onPress={() => this.signOut()}>
 //                    <Text style={styles.textStyle}>Sign Out</Text>
 //                  </TouchableOpacity>
 //              </View>

 //              {userInfo.personalInfo.username}