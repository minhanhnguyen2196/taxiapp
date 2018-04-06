import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import HeaderComponent from '../Header/Header';
import PlacePickerBox from '../PlacePickerBox/PlacePickerBox';

import { getCurrentLocation } from '../../redux/actionCreators';

class InitialScreen extends React.Component {
	
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.props.getCurrentLocation(position);
		},
		(error) => console.log(JSON.stringify(error)),
		{ enableHighAccuracy: true, timeout: 20000 }
		);
	}


	render() {
		const { region } = this.props;
		return (
		<Container>
			<View style={{ flex: 1 }}>
				<HeaderComponent navigation={this.props.navigation} />
				<View style={{ flex: 1 }}>
				<MapView
					style={styles.map}
					region={region}
				/>
				</View>
				<PlacePickerBox navigation={this.props.navigation} />
				
			</View>
			
		</Container>
		);
	}

}

function mapStateToProps(state) {
	return { 
		region: state.location, 
	};
}

export default connect(mapStateToProps, { 
	getCurrentLocation, 
	})(InitialScreen);


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});


