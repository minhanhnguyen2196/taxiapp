import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { bookCar, removeChosenDriver } from '../../redux/actionCreators';


class BookingButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.booking = this.booking.bind(this);
    }

    booking() {
        this.props.bookCar();
        var interval = setInterval(() => {
            if (this.props.booking.status !== 'pending') clearInterval(interval);
            this.props.removeChosenDriver();
             this.props.bookCar();
        }, 3000);
    }
	render() {
		return (
			<Button style={styles.buttonContainer} onPress={() => this.booking()}>
				<Text style={styles.btnText}>Book</Text> 
			</Button>
		);
	}
}

function mapStateToProps(state) {
	return { 
		fare: state.fare,
        booking: state.booking
	};
}

export default connect(mapStateToProps, { bookCar, removeChosenDriver })(BookingButton); 

const styles = StyleSheet.create({
    buttonContainer: {
        borderColor: '#fff',
        borderWidth: 1,
        height: 80,
        width: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 100,
        right: 20,
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        backgroundColor: '#FF5E3A'
    },
    disabledState: {       
        backgroundColor: '#D7D7D7',
    },
    activeState: {
        backgroundColor: '#FF5E3A',
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 12
    }    
});