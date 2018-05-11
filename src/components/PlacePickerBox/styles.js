import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
        alignItems: 'center',
        backgroundColor: '#34495e',
        position: 'absolute',
        top: 100,
        width: width * 0.9,
        height: height * 0.15,
        alignSelf: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 5
	},
    btn: {
        backgroundColor: 'white',
        justifyContent: 'center', 
        alignItems: 'flex-start',
        margin: 10,
        width: width * 0.85,
        height: height * 0.06,
        borderRadius: 6
    },
    viewWrapper: {
        backgroundColor: '#fff', 
        borderRadius: 7, 
        width: 0.95 * width, 
        marginLeft: 5,
        marginRight: 5,
        marginTop: 18,
        marginBottom: 0

    },
    txt: {
        color: 'black',
        fontSize: 15
    },
    label: {
        fontSize: 18,
        color: '#fff',
        fontStyle: 'italic',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    map: {
		...StyleSheet.absoluteFillObject,
	}
});

export default styles;