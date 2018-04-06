import React from 'react';
import { Text, KeyboardAvoidingView, TextInput } from 'react-native';
import { View, InputGroup } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

export const SearchBox = 
	({ getInput, toggleSearchResult, getAddressPrediction, selectedAddress }) => {
	function handleInput(key, txt) {
		getInput({
			key,
			text: txt
		});
	}

	function clearText1() {
		if (Object.keys(selectedAddress.selectedPickUp).length > 0) {
			this.pickUpInput.setNativeProps({ text: selectedAddress.selectedPickUp.name });
			handleInput('pickUp', selectedAddress.selectedPickUp.name);
		} else this.pickUpInput.setNativeProps({ text: '' });
	}
	function clearText2() {
		if (Object.keys(selectedAddress.selectedDropOff).length > 0) {
			this.dropOffInput.setNativeProps({ text: selectedAddress.selectedDropOff.name });
			handleInput('dropOff', selectedAddress.selectedDropOff.name);
		} else this.dropOffInput.setNativeProps({ text: '' });
	}
	function handleOnChangeText(txt, type) {
		handleInput(type, txt);
		getAddressPrediction();
		toggleSearchResult(type);
		if (txt === '') toggleSearchResult('off');
	}
	function handleOnFocus(type) {
		toggleSearchResult(type);
		getAddressPrediction();
	}

	return (
			<KeyboardAvoidingView behavior='padding' style={styles.searchBox}>
				<Animatable.View 
					animation='fadeInDown' iterationCount={1}
					style={styles.inputWrapper}
				>
					<Text style={styles.label}>PICK UP</Text>
					<InputGroup>
						<Icon name='search' size={15} color='#FF5E3A' />
						<TextInput
							onFocus={() => handleOnFocus('pickUp')}
							style={styles.inputSearch} 
							placeholder="Choose pick up location"
							onChangeText={(txt) => handleOnChangeText(txt, 'pickUp')}
							ref={(input) => this.pickUpInput = input}
							onEndEditing={() => {
								clearText1();	
							}}
							defaultValue={selectedAddress.selectedPickUp.name}
							underlineColorAndroid='transparent'
							
						/>
					</InputGroup>
					<Text style={styles.label}>DROP OFF</Text>
					<InputGroup>
						<Icon name='search' size={15} color='#FF5E3A' />
						<TextInput 
							style={styles.inputSearch} 
							placeholder="Choose drop off location"
							onFocus={() => handleOnFocus('dropOff')}
							onChangeText={(txt) => handleOnChangeText(txt, 'dropOff')}
							ref={(input) => this.dropOffInput = input}
							onEndEditing={() => clearText2()} 
							defaultValue={selectedAddress.selectedDropOff.name}
							underlineColorAndroid='transparent'
						/>
					</InputGroup>
				</Animatable.View>
			</KeyboardAvoidingView>
		
		);
};

export default SearchBox;



