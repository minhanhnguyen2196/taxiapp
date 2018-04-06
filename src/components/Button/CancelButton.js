import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { unsetCarType } from '../../redux/actionCreators';


class CancelButton extends React.PureComponent {
	render() {
		return (
			<Button style={styles.buttonContainer} onPress={() => this.props.unsetCarType()}>
				<Text style={styles.btnText}>Cancel</Text> 
			</Button>
		);
	}
}

function mapStateToProps(state) {
	return { 
		fare: state.fare
	};
}

export default connect(mapStateToProps, { unsetCarType })(CancelButton); 

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
        bottom: 200,
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