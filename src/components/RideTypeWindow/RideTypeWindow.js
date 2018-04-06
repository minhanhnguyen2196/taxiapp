import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setCarType } from '../../redux/actionCreators';

class RideTypeWindow extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { type: null }; 
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.carType);
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.txtHeader}> Select your type of car service </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View>
                <TouchableOpacity 
                    style={styles.imgButton} 
                    onPress={() => this.setState({ type: 'Economy' })}>
                    <Image 
                        source={require('../../assets/img/car.png')} 
                        style={styles.img}
                    />
                </TouchableOpacity>
                <Text style={styles.txtCarType}>
                    Economy
                </Text>
                <Text style={{ textAlign: 'center' }}>
                    {this.props.fare.economyTotalFare} VND
                </Text>
            </View>
            <View>
                <TouchableOpacity 
                    style={styles.imgButton} 
                    onPress={() => this.setState({ type: 'Extra' })}>
                    <Image 
                        source={require('../../assets/img/suv.png')} 
                        style={styles.img}
                    />
                </TouchableOpacity>
                <Text style={styles.txtCarType}>
                    Extra
                </Text>
                <Text style={{ textAlign: 'center' }}>
                    {this.props.fare.extraTotalFare} VND
                </Text>
            </View>
            <View>
                <TouchableOpacity 
                    style={styles.imgButton} 
                    onPress={() => this.setState({ type: 'Premium' })}>
                    <Image 
                        source={require('../../assets/img/luxury.png')} 
                        style={styles.img}
                    />
                </TouchableOpacity>
                <Text style={styles.txtCarType}>
                    Premium
                </Text>
                <Text style={{ textAlign: 'center' }}>
                    {this.props.fare.luxuryTotalFare} VND
                </Text>
            </View>
            </View>
            <TouchableOpacity 
                style={styles.confirmBtn} 
                onPress={() => this.props.setCarType(this.state.type)}>
                <Text style={styles.confirmTxt}> 
                    Confirm {this.state.type} </Text>
            </TouchableOpacity>
        </View>
    );
}     
}

function mapStateToProps(state) {
    return { 
        carType: state.carType,
        fare: state.fare
    };
}

export default connect(mapStateToProps, { setCarType })(RideTypeWindow);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center' 
    },
    txtHeader: {
        fontSize: 18, 
        padding: 10, 
        textAlign: 'center', 
        fontWeight: 'bold' 
    },
    img: {
        width: 80,
        height: 80,
        padding: 10,
        borderRadius: 40
    },
    imgButton: {
        height: 90,
        width: 90,
        backgroundColor: '#bdc3c7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
        padding: 10,
        margin: 10,
    },
    txtCarType: {
        color: 'black',
        fontSize: 15,
        margin: 10,
        textAlign:'center'
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
        margin: 20,
        width: 300, 
        height: 40, 
        backgroundColor: 'black', 
    }
});
