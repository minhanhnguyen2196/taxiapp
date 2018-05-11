import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { setCarType } from '../../redux/actionCreators';


const { height, width } = Dimensions.get('window');

class RideTypeWindow extends React.Component {
  constructor(props) {
      super(props);
      this.state = { type: null, isDisabled: true }; 
  }

  componentDidUpdate(prevProps, prevState) {
      console.log(this.props.carType);
  }

  render() {
      return (
      <View style={styles.container}>
        <View style={{ margin: 5 }}>
          <Text style={styles.txtHeader}> Select your type of car service </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View>
              <TouchableOpacity 
                  style={styles.imgButton} 
                  onPress={() => this.setState({ type: 'Economy' })}
              >
                  <Image 
                      source={require('../../assets/img/sedan.png')} 
                      style={styles.img}
                  />
              </TouchableOpacity>
              <Text style={styles.txtCarType}>
                  Economy
              </Text>
              <Text style={{ textAlign: 'center' }}>
                  {this.props.fare.economyTotalFare}.000 VND
              </Text>
          </View>
          <View>
              <TouchableOpacity 
                  style={styles.imgButton} 
                  onPress={() => this.setState({ type: 'Extra' })}
              >
                  <Image 
                      source={require('../../assets/img/suv.png')} 
                      style={styles.img}
                  />
              </TouchableOpacity>
              <Text style={styles.txtCarType}>
                  Extra
              </Text>
              <Text style={{ textAlign: 'center' }}>
                  {this.props.fare.extraTotalFare}.000 VND
              </Text>
          </View>
          <View>
              <TouchableOpacity 
                  style={styles.imgButton} 
                  onPress={() => this.setState({ type: 'Premium' })}
              >
                  <Image 
                      source={require('../../assets/img/luxury.png')} 
                      style={styles.img}
                  />
              </TouchableOpacity>
              <Text style={styles.txtCarType}>
                  Premium
              </Text>
              <Text style={{ textAlign: 'center' }}>
                  {this.props.fare.luxuryTotalFare}.000 VND
              </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: 'black',
            width,
            margin: 5
          }}
        />
        <View style={{ margin: 5, flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Icon name='money' style={styles.icon} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('PaymentScreen')}>
              <Text style={{ fontSize: 14, color: 'steelblue' }}>Change your current payment method</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
            style={styles.confirmBtn} 
            onPress={() => {
              this.props.setCarType(this.state.type);
            }}
        >
            <Text style={styles.confirmTxt}> Confirm {this.state.type} </Text>
        </TouchableOpacity>
      </View>
  );
}     
}

function mapStateToProps(state) {
    return { 
        carType: state.carType,
        fare: state.fare
    };
}

export default connect(mapStateToProps, { setCarType })(RideTypeWindow);

const styles = StyleSheet.create({
  container: {
      height: height * 0.55,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width
  },
  txtHeader: {
      fontSize: 16, 
      padding: 10, 
      textAlign: 'center',
  },
  img: {
      width: 80,
      height: 80,
      padding: 10,
      borderRadius: 40
  },
  imgButton: {
      height: 90,
      width: 90,
      backgroundColor: '#bdc3c7',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 45,
      padding: 10,
      margin: 10,
  },
  txtCarType: {
      color: 'black',
      fontSize: 15,
      margin: 10,
      textAlign: 'center'
  },
  confirmTxt: {
      color: 'white', 
      textAlign: 'center', 
      padding: 10, 
      borderRadius: 6, 
      fontWeight: 'bold'
  },
  confirmBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      margin: 20,
      width: 300, 
      height: 40, 
      backgroundColor: 'black', 
  },
  icon: {
    fontSize: 28,
    paddingHorizontal: 5
  },
  modal: {
  justifyContent: 'center',
  alignItems: 'center'
  },
  modal3: {
    height: 300,
    width: 300
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
   text: {
    color: "black",
    fontSize: 22
  }
});
