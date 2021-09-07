import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Interactable from 'react-native-interactable';

const { width, height } = Dimensions.get('window'); 
export default class TripTracker extends React.Component {
	constructor(props) {
      super(props);
    
      this.state = {
        text1: '',
        text2: ''
      };
    }
	render() {
		const { vehicle } = this.props.driverInfo;
		const { duration, distance } = this.props.distanceFromDriver.rows[0].elements[0];
		return (
		<Interactable.View 
            style={styles.container}
            verticalOnly={true}
            snapPoints={[{ y: 450 }, { y: 300 }]}
            initialPosition={{ x: 0, y: 450 }}
            onSnap={this.onDrawerSnap}
        >
			<View style={styles.iconContainer}>
				<Icon name="window-minimize" style={styles.icon} />
				<Text style={styles.onWayText}>
					{(duration.value < 100) ? '' : 'Your driver is on the way'}
				</Text>
				<Text style={styles.distanceText}>
					{(duration.value < 100) ? 'Your driver has arrived!!!' : duration.text + " " + "-" + distance.text}
				</Text>
				<Text style={styles.vehicleText}>
					{vehicle && vehicle.plateNumber} {vehicle && vehicle.model}
				</Text>
			</View>
            <View style={{ paddingTop: 20 }}>
			<TouchableOpacity
				style={styles.confirmBtn}
				onPress={() => {
					this.props.updateTripStatus('cancel');
					this.props.navigation.goBack();
				}}
            >
				<Text style={styles.confirmTxt}> Cancel Your Trip </Text>
			</TouchableOpacity>
            </View>
		</Interactable.View>
	);
	}	
}

const styles = StyleSheet.create({
	container: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        position: 'absolute',
        height,
        borderRadius: 10,
        flex: 1
    },
    iconContainer: {
        width,
        alignItems: 'center',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12
    },
    icon: {
        color: '#E7E7E7',
        fontSize: 15
    },
    distanceText: {
        marginTop: 5,
        color: '#FF5E3A',
        fontWeight: 'bold',
        fontSize: 16
    },
    onWayText: {
        marginTop: 5,
        color: '#636363',
        fontSize: 15
    },
    vehicleText: {
        marginTop: 10,
        color: '#636363',
        fontSize: 14
    },
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
        margin: 10,
        width: width * 0.9,
        height: 40,
        backgroundColor: '#e67e22', 
        borderRadius: 6
    }
});
