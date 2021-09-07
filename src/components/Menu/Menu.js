import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import removeAccessToken from '../Authentication/removeToken';

const { width } = Dimensions.get('window');

class Menu extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }
  signOut() {
    removeAccessToken()
    .then(() => this.props.navigation.navigate('Auth'));
  }

	render() {
	const { userInfo } = this.props;
	return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#e67e22', alignItems: 'center', width }}>
        <Image 
          source={require('../../assets/img/person.png')} 
          style={styles.profile}
        />  
        <View style={{ alignItems: 'center', margin: 10 }}>
          <Text style={{ color: 'white', fontSize: 18 }}>
          {userInfo.personalInfo.username}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', width }}>
        <View style={{ paddingLeft: 10, borderBottomWidth: 0.5 }}>
          <TouchableOpacity
            style={styles.btnSignInStyle}
            onPress={() => { this.props.navigation.navigate('TripHistory'); }}
          >
            <Icon name='history' style={styles.icon} color='#000000' />
            <Text style={styles.textStyle}>Trip History </Text>
          </TouchableOpacity>
      
        </View>
          <View style={{ paddingLeft: 10, borderBottomWidth: 0.5 }}>
            <TouchableOpacity
              style={styles.btnSignInStyle}
              onPress={() => { this.props.navigation.navigate('PaymentScreen'); }}
            >
              <Icon name='money' style={styles.icon} color='#000000' />
              <Text style={styles.textStyle}>Payment</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 10, borderBottomWidth: 0.5 }}>
            <TouchableOpacity
              style={styles.btnSignInStyle}
              onPress={() => { this.props.navigation.navigate('PaymentScreen'); }}
            >
              <Icon name='user-secret' style={styles.icon} color='#000000' />
              <Text style={styles.textStyle}>Private Driver</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 10, borderBottomWidth: 0.5 }}>
            <TouchableOpacity
              style={styles.btnSignInStyle}
              onPress={() => { this.props.navigation.navigate('PaymentScreen'); }}
            >
              <Icon name='bell' style={styles.icon} color='#000000' />
              <Text style={styles.textStyle}>Notification</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 10, borderBottomWidth: 0.5 }}>
            <TouchableOpacity
              style={styles.btnSignInStyle}
              onPress={() => { this.props.navigation.navigate('PaymentScreen'); }}
            >
              <Icon name='question-circle' style={styles.icon} color='#000000' />
              <Text style={styles.textStyle}>Support</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 10, borderBottomWidth: 0.5 }}>
            <TouchableOpacity
              style={styles.btnSignInStyle}
              onPress={() => this.signOut()}
            >
              <Icon name='sign-out' style={styles.icon} color='#000000' />
              <Text style={styles.textStyle}>Sign Out</Text>
            </TouchableOpacity>
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
      marginBottom: 10,
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
    fontSize: 20,
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