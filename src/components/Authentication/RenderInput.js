import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class RenderInput extends React.Component {
	render() {
		const { keyboardType, secureTextEntry, placeholder,
		returnKeyLabel, refField, onSubmit, meta: { touched, error }, input: { onChange, ...resInput } } = this.props;
		return (
		<View>
			<Animatable.View
				animation='zoomIn' iterationCount={1}
				style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}
			>
				<TextInput
					style={styles.input}
					keyboardType={keyboardType}
					underlineColorAndroid='transparent'
					secureTextEntry={secureTextEntry}
					returnKeyLabel={returnKeyLabel}
					ref={refField}
					onSubmitEditing={onSubmit}
					onChangeText={onChange} {...resInput}
					placeholder={placeholder}
					placeholderTextColor='white'
				/>
			</Animatable.View>
			{
				touched && (error && 
					<Text style={{ color: 'red', fontSize: 13, textAlignVertical: 'top' }}>
						{error}
					</Text>
				)
			}
		</View>
	);
	}	
}

const styles = StyleSheet.create({
	input: {
		borderColor: 'white',  
		height: 50, 
		width: 300, 
		paddingHorizontal: 20,
		backgroundColor: '#34495e',
		marginVertical: 10,
		borderRadius: 20,
		borderWidth: 2,
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 16,
	}
});
