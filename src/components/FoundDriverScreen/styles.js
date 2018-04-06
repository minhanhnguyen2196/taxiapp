import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495e',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16,
        margin: 10
    },
    locationIcon: {
        color: '#fff',
        fontSize: 40,
        marginTop: 15
    },
    content: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    pickup: {
        width: width * 0.8,
        borderRadius: 7,
        height: 40,
        backgroundColor: '#fff',
        marginTop: 260,
        justifyContent: 'center',
        alignItems: 'center'

    },
    toArrow: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
    dropoff: {
        width: width * 0.8,
        borderRadius: 7,
        height: 40,
        backgroundColor: '#fff',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    cancelBtnWrapper: {
        margin: 15,
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelBtn: {
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent'
    },
    cancelBtnText: {
        color: '#fff',
    },
    termsText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 15

    }
});

export default styles;

