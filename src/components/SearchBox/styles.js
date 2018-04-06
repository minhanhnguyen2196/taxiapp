import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    searchBox: {
        top: 0,
        position: 'absolute',
        width
    },
    inputWrapper: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: '#fff',
        opacity: 0.9,
        borderRadius: 7
    },
    secondInputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 0,
        backgroundColor: '#fff',
        opacity: 0.9,
        borderRadius: 7
    },
    inputSearch: {
        fontSize: 14,
        width: width * 0.7
        
    },
    label: {
        fontSize: 15,
        fontStyle: 'italic',
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 0,
        backgroundColor: 'white',
    }
});

export default styles;