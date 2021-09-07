import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { setCarType } from '../../redux/actionCreators';

const { height, width } = Dimensions.get('window');
const car1 = require('../../assets/img/car1.png');
const car1n = require('../../assets/img/car1n.png');
//const sedan2 = require('../../assets/img/sedan2.png');
const car2 = require('../../assets/img/car2.png');
const car2n = require('../../assets/img/car2n.png');
//const suv2 = require('../../assets/img/suv2.png');
const car3 = require('../../assets/img/car3.png');
const car3n = require('../../assets/img/car3n.png');
//const minivan2 = require('../../assets/img/minivan2.png');


class RideTypeWindow extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = { type: null };
  }
  componentDidUpdate(prevProps, prevState) {
      console.log(this.props.carType);
  }
  render() {
    const { carType } = this.props;
      return (
      <Animatable.View
        animation="slideInLeft" 
        style={styles.container}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity 
              style={styles.imgButton} 
              onPress={() => this.setState({ type: 'Economy' })}
            >
              <Image 
                source={(this.state.type === 'Economy') ? car1 : car1n} 
                style={styles.img}  
              />
            </TouchableOpacity>
            <Text style={styles.txtCarType}>
                Economy
            </Text>
            <Text style={{ textAlign: 'center', color: 'steelblue' }}>
                {this.props.fare.economyTotalFare}.000 VND
            </Text>
          </View>
          <View style={{ padding: 10 }}>
              <TouchableOpacity 
                  style={styles.imgButton} 
                  onPress={() => this.setState({ type: 'Extra' })}
              >
                  <Image 
                    source={(this.state.type === 'Extra') ? car2 : car2n} 
                    style={styles.img}
                  />
              </TouchableOpacity>
              <Text style={styles.txtCarType}>
                  Extra
              </Text>
              <Text style={{ textAlign: 'center', color: 'steelblue'  }}>
                  {this.props.fare.extraTotalFare}.000 VND
              </Text>
          </View>
          <View style={{ padding: 10 }}>
              <TouchableOpacity 
                  style={styles.imgButton} 
                  onPress={() => this.setState({ type: 'Premium' })}
              >
                  <Image 
                    source={(this.state.type === 'Premium') ? car3 : car3n} 
                    style={styles.img}
                  />
              </TouchableOpacity>
              <Text style={styles.txtCarType}>
                  Premium
              </Text>
              <Text style={{ textAlign: 'center', paddingLeft: 10, color: 'steelblue' }}>
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
        <View>
          <TouchableOpacity  
            onPress={() => this.props.navigation.navigate('PaymentScreen')}
          >
            <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <Icon name='money' style={styles.icon} />
              <Text style={{ fontSize: 14, color: 'steelblue' }}>Change your payment option</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity 
          style={styles.confirmBtn} 
          onPress={() => {
            this.props.setCarType(this.state.type);
          }}
        >
          <Text style={styles.confirmTxt}> Confirm {this.state.type} </Text>
        </TouchableOpacity>
        </View>
      </Animatable.View>
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
      height: height * 0.45,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width
  },
  txtHeader: {
      fontSize: 16, 
      padding: 5, 
      textAlign: 'center',
  },
  img: {
    height: 64,
    width: 64,
  },
  imgButton: {
      height: 70,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 35,
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
      width: width * 0.9, 
      height: 50, 
      backgroundColor: '#e67e22', 
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
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10
  },
   text: {
    color: 'black',
    fontSize: 22
  }
});
