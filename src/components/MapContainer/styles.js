import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject
	},
	talkBubble: {
    	backgroundColor: 'transparent',
    	justifyContent: 'center',
    	alignItems: 'center' 
  	},
 	 talkBubbleSquare: {
	    width: 90,
	    height: 30,
	    backgroundColor: '#fff',
	    borderRadius: 10,
	    justifyContent: 'center',
    	alignItems: 'center' 
 	 },
  	talkBubbleTriangle: {
	    width: 0,
	    height: 0,
	    backgroundColor: 'transparent',
	    borderStyle: 'solid',
	    borderLeftWidth: 5,
	    borderRightWidth: 5,
	    borderBottomWidth: 10,
	    borderLeftColor: 'transparent',
	    borderRightColor: 'transparent',
	    borderBottomColor: '#fff',
	      transform: [
	      {rotate: '180deg'}
	    ]
  	}
});

export default styles;

