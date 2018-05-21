import React from 'react';
import { 
	Text, 
	KeyboardAvoidingView, 
	TextInput, 
	StyleSheet, 
	Dimensions, 
	TouchableOpacity } from 'react-native';
import { View, InputGroup } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';


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
				<Text style={styles.label}>Pick Up Location</Text>
				<View>
				<InputGroup>
					<Icon name='search' size={15} color='#FF5E3A' />
					<TextInput
						onFocus={() => handleOnFocus('pickUp')}
						style={styles.inputSearch} 
						placeholder="Choose your pick up location"
						onChangeText={(txt) => handleOnChangeText(txt, 'pickUp')}
						ref={(input) => this.pickUpInput = input}
						onEndEditing={() => {
							clearText1();
						}}
						defaultValue={selectedAddress.selectedPickUp.name}
						underlineColorAndroid='transparent'
					/>
					<TouchableOpacity
						style={{ width: width * 0.05 }}
						onPress={() => this.pickUpInput.setNativeProps({ text: '' })}
					>
						<Icon name='times' size={16} />
					</TouchableOpacity>
				</InputGroup>
				</View>
				<Text style={styles.label}>Drop Off Location</Text>
				<InputGroup>
					<Icon name='search' size={15} color='#FF5E3A' />
					<TextInput 
						style={styles.inputSearch} 
						placeholder="Choose your destination"
						onFocus={() => handleOnFocus('dropOff')}
						onChangeText={(txt) => handleOnChangeText(txt, 'dropOff')}
						ref={(input) => this.dropOffInput = input}
						onEndEditing={() => {
							clearText2();
						}}
						defaultValue={selectedAddress.selectedDropOff.name}
						underlineColorAndroid='transparent'
					/>
					<TouchableOpacity
						style={{ width: width * 0.05 }}
						onPress={() => this.dropOffInput.setNativeProps({ text: '' })}
					>
						<Icon name='times' size={16} />
					</TouchableOpacity>
				</InputGroup>
			</Animatable.View>
		</KeyboardAvoidingView>	
	);
};

export default SearchBox;

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    searchBox: {
        top: 0,
        position: 'absolute',
        width,
        elevation: 8
    },
    inputWrapper: {
        backgroundColor: '#fff',
        opacity: 0.9,
    },
    secondInputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 0,
        backgroundColor: '#fff',
        opacity: 0.9,
        borderRadius: 7
    },
    inputSearch: {
        fontSize: 14,
        width: width * 0.8
        
    },
    label: {
        fontSize: 15,
        fontStyle: 'italic',
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 0,
        backgroundColor: 'white',
    }
});