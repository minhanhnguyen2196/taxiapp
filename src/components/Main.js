import React, { Component } from 'react';
import Home from './Home/Home';
import FoundDriverScreen from './FoundDriverScreen/FoundDriverScreen';
import AnimatedMarkers from './Home/Test';
import ValidationCode from './Authentication/ValidationCode';
import GoogleSignUpForm from './Authentication/GoogleSignUp/GoogleSignUpForm';
import { App, AppStack, AuthStack } from '../utils/navigator';
import Menu from './Menu/Menu';
import TripHistory from './Menu/TripHistory/TripHistory';
import RideTypeWindow from './RideTypeWindow/RideTypeWindow';
import DriverProfile from './TrackDriver/DriverProfile/DriverProfile';
import DriverRating from './TrackDriver/DriverRating/DriverRating';

export default class Main extends React.PureComponent {
	render() {
		return (
			<App />
		);
	}
}