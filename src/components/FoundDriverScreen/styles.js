import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        margin: 10
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        flex: 1,
    },
    pickup: {
        width: width * 0.8,
        borderRadius: 7,
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row'

    },
    toArrow: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
    dropoff: {
        width: width * 0.8,
        borderRadius: 7,
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row'

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
        backgroundColor: 'black'
    },
    cancelBtnText: {
        color: '#fff',
    },
    termsText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 15
    },
    locationIcon: {
        color: 'black',
        fontSize: 20,
        margin: 10
    },
});

export default styles;

