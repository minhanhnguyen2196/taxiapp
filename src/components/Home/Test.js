import React, { Component } from 'react';
import {Text, TouchableHighlight, View } from 'react-native';
import { phonecall } from 'react-native-communications';
import RNGooglePlaces from 'react-native-google-places';


export default class ModalExample extends Component {
	constructor(props) {
	  super(props);
	
	  this.openSearchModal = this.openSearchModal.bind(this);
	}
	openSearchModal() {
    RNGooglePlaces.openPlacePickerModal()
    .then((place) => {
		console.log(place);
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {
    return (
      <View style={{ marginTop: 22, backgroundColor: 'blue' }}>
        <TouchableHighlight onPress={() => this.openSearchModal()}>
          <View>
            <Text>Make phonecall</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}