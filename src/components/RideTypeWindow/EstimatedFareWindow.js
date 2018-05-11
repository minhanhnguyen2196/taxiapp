import React from 'react';
import {Text, View, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import BookingButton from '../Button/BookingButton';
import CancelButton from '../Button/CancelButton';

const { height, width } = Dimensions.get('window');

class EstimatedFareWindow extends React.PureComponent {
  render() {
    const { distanceMatrix, fare } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textWrapper}>
        <Text style={{ fontSize: 18, color: 'black' }}> ESTIMATED INFO </Text>
        <View style={styles.line} />
        </View>
        
        <View style={styles.iconWrapper}>
          <View style={{ paddingHorizontal: 20 }}>
            <FontAwesome name='road' style={styles.icon} color='black' />
            <Text> Distance </Text>
            <Text style={{ color: 'steelblue' }}> {Math.ceil(distanceMatrix.rows[0].elements[0].distance.value / 1000)} km </Text>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <FontAwesome name='clock-o' style={styles.icon} color='black' />
            <Text> Time </Text>
            <Text style={{ color: 'steelblue' }}> {Math.ceil(distanceMatrix.rows[0].elements[0].duration.value / 60)} min </Text>
          </View>

          <View style={{ paddingHorizontal: 30 }}>
            <FontAwesome name='dollar' style={styles.icon} color='black' />
            <Text> Fare </Text>
            <Text style={{ color: 'steelblue' }}> {fare.economyTotalFare}.000 VND </Text>
          </View>
        </View>
        <BookingButton />
        <CancelButton />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 35,
    padding: 10
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width, 
    height: height * 0.6 
  },
  textWrapper: {
    margin: 5, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
    width,
    margin: 5
  },
  iconWrapper: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingLeft: 10
  }


});

function mapStateToProps(state) {
  return { 
    region: state.location, 
    inputData: state.inputData,
    resultTypes: state.resultTypes,
    prediction: state.prediction,
    selectedAddress: state.selectedAddress,
    distanceMatrix: state.distanceMatrix,
    fare: state.fare,
    booking: state.booking,
    nearbyDriver: state.nearbyDriver,
    userInfo: state.userInfo,
    carType: state.carType
  };
}

export default connect(mapStateToProps, {})(EstimatedFareWindow);
