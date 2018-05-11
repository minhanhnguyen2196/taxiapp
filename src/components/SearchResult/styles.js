import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    searchResultsWrapper: {
        flex: 1,
        width,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 171,
    },
    primaryText: {
        fontWeight: 'bold',
        color: '#373737'
    },
    secondaryText: {
        fontStyle: 'italic',
        color: '#7D7D7D',
    },
    leftContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderLeftColor: '#7D7D7D',
    },
    leftIcon: {
        fontSize: 20,
        color: '#7D7D7D',
    },
    distance: {
        fontSize: 12,
    }
});

export default styles;