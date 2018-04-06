import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import removeAccessToken from '../Authentication/removeToken';

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
            <Image 
              source={require('../../assets/img/profile.png')} 
              style={styles.profile}
            />
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 15 }}>
                   ok
                </Text>
                <View>
                    <TouchableOpacity 
                          style={styles.btnSignInStyle} 
                          onPress={() => { this.props.navigation.navigate('TripHistory'); }}
                    >
                        <Text style={styles.textStyle}>Trip History </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                          style={styles.btnSignInStyle} 
                          onPress={() => { this.props.navigation.navigate('PaymentScreen'); }}
                    >
                        <Text style={styles.textStyle}>Payment Method </Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.btnSignInStyle} onPress={() => this.signOut()}>
                      <Text style={styles.textStyle}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
                <View />
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

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'steelblue',
        borderRightWidth: 3,
        alignItems: 'center'
    },
    profile: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 40

    },
    btnStyle: {
      height: 50,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      paddingHorizontal: 60
},
    textStyle: {
      color: 'black',
      fontSize: 15,
      textAlign: 'center',
    },
    btnSignInStyle: {
      height: 50,
      backgroundColor: 'white',
      borderRadius: 5,
      width: 185,
      justifyContent: 'center',
      marginBottom: 10,
      paddingLeft: 10,
     
    }


});
