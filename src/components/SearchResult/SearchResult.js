import React from 'react';
import { Text } from 'react-native';
import { View, List, ListItem, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getSelectedAddress } from '../../redux/actionCreators';
import styles from './styles';

 
class SearchResult extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleSelectedAddress = this.handleSelectedAddress.bind(this);
	}
    handleSelectedAddress = (placeID) => {
        this.props.getSelectedAddress(placeID);
    }
	render() {
		return (
			<View style={styles.searchResultsWrapper}>
				<List
					dataArray={this.props.prediction}
					renderRow={(item) => 
						<View>
							<ListItem onPress={() => this.handleSelectedAddress(item.placeID)} button avatar>
								<Left style={styles.leftContainer}>
								<Icon style={styles.leftIcon} name='location-on' />
								</Left>
								<Body>
									<Text style={styles.primaryText}>
										{item.primaryText}
									</Text>
									<Text style={styles.secondaryText}> 
										{item.primaryText}
									</Text>
								</Body>
							</ListItem>
						</View>
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

export default connect(mapStateToProps, { getSelectedAddress })(SearchResult);



