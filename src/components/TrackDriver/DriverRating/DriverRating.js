import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import StarRating from 'react-native-star-rating';

export default class DriverRating extends React.PureComponent {
	constructor(props) {
	    super(props);
	    this.state = {
	      starCount: 0
	    };
	}
	onStarRatingPress(rating) {
	    this.setState({
	      starCount: rating
	    });
	}

	render() {
		return (
			<KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
				<Text style={{ fontSize: 16 }}> Rate your trip with Minh Anh Nguyen </Text>
				<StarRating
					starSize={30}
					maxStars={5}
					starColor="#FF5E3A"
					rating={this.state.starCount}
        			selectedStar={(rating) => this.onStarRatingPress(rating)}
        			fullStarColor={'red'}
        			starStyle={{ padding: 5 }}
				/>
				<View style={{ justifyContent: 'center' }}>
				<TextInput
					style={{ fontSize: 16, width: 300, height: 100 }}
					placeholder="Please write your feedback. Your opinion is important to us"
					multiline={true}
				/>
				</View>
				<TouchableOpacity 
					style={styles.confirmBtn}
					onPress={() => { 
					this.props.navigation.goBack();
					}}
				>
					<Text style={styles.confirmTxt}> Thank you for your time</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
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
      backgroundColor: '#e67e22', 
  },
});
