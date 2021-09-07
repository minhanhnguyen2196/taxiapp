import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { unsetCarType } from '../../redux/actionCreators';


class CancelButton extends React.PureComponent {
	render() {
        return (
        <View style={styles.container} >
            <TouchableOpacity 
                style={styles.confirmBtn}
                onPress={() => this.props.unsetCarType()}
            >
                <Text style={styles.confirmTxt}>Cancel</Text>
            </TouchableOpacity>
        </View>

    );
}
}

function mapStateToProps(state) {
	return { 
		fare: state.fare
	};
}

export default connect(mapStateToProps, { unsetCarType })(CancelButton); 
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
        height: 50,
        borderRadius: 6,
        backgroundColor: '#e67e22', 
    }
});