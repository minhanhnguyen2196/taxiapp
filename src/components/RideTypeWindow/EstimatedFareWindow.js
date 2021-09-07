import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import BookingButton from '../Button/BookingButton';
import CancelButton from '../Button/CancelButton';

const { height, width } = Dimensions.get('window');

class EstimatedFareWindow extends React.PureComponent {
  render() {
    const { distanceMatrix, fare, carType } = this.props;
    const estimateFare = (carType === 'Economy') ? 
    fare.economyTotalFare : ((carType === 'Extra') ? fare.extraTotalFare : fare.luxuryTotalFare);
    return (
      <Animatable.View
        animation="slideInUp"
        style={styles.container}
      >
        <View style={styles.textWrapper}>
          <Text style={{ fontSize: 18, color: 'black' }}> ESTIMATED INFO </Text>
        </View>
        <View style={styles.iconWrapper}>
          <View style={{ paddingHorizontal: 20 }}>
            <FontAwesome name='road' style={styles.icon} color='black' />
            <Text style={{ paddingLeft: 5 }}> Distance </Text>
            <Text style={{ color: 'steelblue', paddingLeft: 5 }}> {Math.ceil(distanceMatrix.rows[0].elements[0].distance.value / 1000)} km </Text>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <FontAwesome name='clock-o' style={styles.icon} color='black' />
            <Text style={{ paddingLeft: 5 }}> Time </Text>
            <Text style={{ color: 'steelblue', paddingLeft: 5 }}> {Math.ceil(distanceMatrix.rows[0].elements[0].duration.value / 60)} min </Text>
          </View>

          <View style={{ paddingHorizontal: 30 }}>
            <FontAwesome name='dollar' style={styles.icon} color='black' />
            <Text style={{ paddingLeft: 5 }}> Fare </Text>
            <Text style={{ color: 'steelblue', paddingLeft: 5 }}> {estimateFare}.000 VND </Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
        <BookingButton />
        <CancelButton /> 
        </View>
      </Animatable.View>
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
    height: height * 0.45,
    paddingTop: 20
  },
  textWrapper: {
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
