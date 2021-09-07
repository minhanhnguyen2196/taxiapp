import React from 'react';
import { 
	Text, 
	KeyboardAvoidingView,  
	StyleSheet, 
	Dimensions, 
	TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import RNGooglePlaces from 'react-native-google-places';

export const SearchBox = 
	({ getInput, toggleSearchResult, getAddressPrediction, selectedAddress, getSelectedAddress }) => {
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
	function handleOnPress(type) {
		toggleSearchResult(type);
		RNGooglePlaces.openPlacePickerModal()
		.then((place) => {
			getSelectedAddress(place);
		})
		.catch(error => console.log(error.message)); 
	}
	
	return (
		<KeyboardAvoidingView behavior='padding' style={styles.searchBox}>
			<View 
				style={styles.inputWrapper}
			>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Icon name='map-marker' size={12} color='#FF5E3A' style={{ padding: 12 }} /> 
				<View style={styles.wrapper}>
					<TouchableOpacity
						onPress={() => {
							handleOnPress('pickUp');
						}} 
						style={{ flexDirection: 'row', padding: 5, height: 45, alignItems: 'center' }} 
					>
						
						<Text style={{ fontSize: 14, paddingLeft: 10, color: 'black' }}> 
							{ (selectedAddress.selectedPickUp.address) ? 
							selectedAddress.selectedPickUp.address.replace(", Hà Nội, Việt Nam","") : 'Choose your pick up location' } 
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Icon name='ellipsis-v' size={18} color='black' style={{ paddingLeft: 12 }} /> 
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Icon name='flag' size={12} color='#FF5E3A' style={{ padding: 10 }} /> 
				<View style={styles.wrapper}>
				<TouchableOpacity
					onPress={() => {
						handleOnPress('dropOff');
						}} 
					style={{ flexDirection: 'row', padding: 5, height: 45, alignItems: 'center' }} 
				>
				
					<Text style={{ fontSize: 14, paddingLeft: 10, color: 'black' }}> 
						{ (selectedAddress.selectedDropOff.address) ? 
						selectedAddress.selectedDropOff.address.replace(", Hà Nội, Việt Nam","") : 'Choose your destination' } 
					</Text>
				</TouchableOpacity>
			</View>
			</View>
			</View>
		</KeyboardAvoidingView>	
	);
};

export default SearchBox;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    searchBox: {
        top: 0,
        position: 'absolute',
        width,
        elevation: 8
    },
    inputWrapper: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        height: height * 0.2,
        elevation: 8,
        paddingTop: 10
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
        width: width * 0.85
        
    },
    label: {
        fontSize: 15,
        fontStyle: 'italic',
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 0,
    },
    wrapper: {
    	width: width * 0.85,
    	height: 45,
    	borderRadius: 6,
    	backgroundColor: '#f2f3f4',
    }
});


// <InputGroup>
// 					<Icon name='search' size={15} color='#FF5E3A' />
// 					<TextInput
// 						onFocus={() => handleOnFocus('pickUp')}
// 						style={styles.inputSearch} 
// 						placeholder="Choose your pick up location"
// 						onChangeText={(txt) => handleOnChangeText(txt, 'pickUp')}
// 						ref={(input) => this.pickUpInput = input}
// 						onEndEditing={() => {
// 							clearText1();
// 						}}
// 						defaultValue={selectedAddress.selectedPickUp.name}
// 						underlineColorAndroid='transparent'
// 					/>
// 					<TouchableOpacity
// 						style={{ width: width * 0.05 }}
// 						onPress={() => this.pickUpInput.setNativeProps({ text: '' })}
// 					>
// 						<Icon name='times' size={16} />
// 					</TouchableOpacity>
// 				</InputGroup>

// <InputGroup>
// 					<Icon name='search' size={15} color='#FF5E3A' />
// 					<TextInput 
// 						style={styles.inputSearch} 
// 						placeholder="Choose your destination"
// 						onFocus={() => handleOnFocus('dropOff')}
// 						onChangeText={(txt) => handleOnChangeText(txt, 'dropOff')}
// 						ref={(input) => this.dropOffInput = input}
// 						onEndEditing={() => {
// 							clearText2();
// 						}}
// 						defaultValue={selectedAddress.selectedDropOff.name}
// 						underlineColorAndroid='transparent'
// 					/>
// 					<TouchableOpacity
// 						style={{ width: width * 0.05 }}
// 						onPress={() => this.dropOffInput.setNativeProps({ text: '' })}
// 					>
// 						<Icon name='times' size={16} />
// 					</TouchableOpacity>
// 				</InputGroup>

<Icon name='search' size={15} color='#FF5E3A' />