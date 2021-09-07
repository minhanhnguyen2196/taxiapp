import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bookCar, updateTripStatus } from '../../redux/actionCreators';


class BookingButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.booking = this.booking.bind(this);
    }

    booking() {
        this.props.bookCar();
        // var interval = setInterval(() => {
        //     if (this.props.booking.status !== 'pending') clearInterval(interval);
        //     if (this.props.nearbyDrivers.length > 0) {
        //         this.props.bookCar();
        //     } else {
        //         this.props.updateTripStatus('no driver found');
        //         clearInterval(interval);
        //     }
        // }, 30000);
    }
	render() {
        return (
        <View style={styles.container} >
            <TouchableOpacity 
                style={styles.confirmBtn}
                onPress={() => this.booking()}
            >
                <Text style={styles.confirmTxt}>Request Your Ride Now</Text>
            </TouchableOpacity>
        </View>

    );
    }
}

function mapStateToProps(state) {
	return { 
		fare: state.fare,
        booking: state.booking,
        nearbyDrivers: state.nearbyDriver
	};
}

export default connect(mapStateToProps, { bookCar, updateTripStatus })(BookingButton); 

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        
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
        borderRadius: 6, 
        height: 50, 
        backgroundColor: '#e67e22', 
    }
});