import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions, Keyboard } from 'react-native';
import { View, List, ListItem, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getSelectedAddress, toggleSearchResult } from '../../redux/actionCreators';
import styles from './styles';

const { width } = Dimensions.get('window');

class SearchResult extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleSelectedAddress = this.handleSelectedAddress.bind(this);
		this.showFakeMarker = this.showFakeMarker.bind(this);
	}
    handleSelectedAddress = (placeID) => {
        this.props.getSelectedAddress(placeID);
    }

    showFakeMarker = () => {
			const { resultTypes } = this.props;
			if (resultTypes.resultType.pickUp) {
				this.props.toggleSearchResult('showFakeMarkerPickUp');
			} else this.props.toggleSearchResult('showFakeMarkerDropOff');
			Keyboard.dismiss();
    }
	render() {
		return (
			<View style={styles.searchResultsWrapper}>
				<View>
					<TouchableOpacity 
						style={{ flexDirection: 'row', alignItems: 'center', height: 30, margin: 10, }}
						onPress={() => this.showFakeMarker()}
					>
						<FontAwesome name='map-pin' style={{ fontSize: 20, color: 'black', padding: 10 }} />
						<Text style={{ paddingLeft: 5 }}> Select your location on the map </Text>
					</TouchableOpacity>
					<View
						style={{
						borderBottomWidth: StyleSheet.hairlineWidth,
						borderBottomColor: 'black',
						width,
						marginTop: 5
						}}
					/>
				</View>
				<List
					dataArray={this.props.prediction}
					renderRow={(item) => 
						<ListItem 
							onPress={() => this.handleSelectedAddress(item.placeID)} 
							button avatar
						>
							<Left style={styles.leftContainer}>
								<Icon style={styles.leftIcon} name='location-on' />
							</Left>
							<Body>
								<Text style={styles.primaryText}>{item.primaryText}</Text>
								<Text style={styles.secondaryText}> {item.secondaryText}</Text>
							</Body>
						</ListItem>
					}
				/>
			</View>
		);
	}
}

function mapStateToProps(state) {
    return { 
        myRegion: state.location,
        inputData: state.inputData,
        resultTypes: state.resultTypes,
        prediction: state.prediction,
        selectedAddress: state.selectedAddress
    };
}

export default connect(mapStateToProps, { getSelectedAddress, toggleSearchResult })(SearchResult);

