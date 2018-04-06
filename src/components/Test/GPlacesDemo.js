import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

export default class GPlacesDemo extends React.Component {
  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
		console.log(place);
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.openSearchModal()}
        >
          <Text>Pick a Place</Text>
        </TouchableOpacity>
      </View>
    );
  }
}