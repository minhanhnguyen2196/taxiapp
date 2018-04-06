import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  footer: {
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
  },
  fare: {
	position: 'absolute',
	bottom: 50,
	left: 0,
	right: 0,
  }
});

export default styles;