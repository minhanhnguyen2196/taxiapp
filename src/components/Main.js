import React, { Component } from 'react';
import Home from './Home/Home';
import FoundDriverScreen from './FoundDriverScreen/FoundDriverScreen';
import Test from './Home/Test';
import LoginForm from './Authentication/LoginForm';
import GoogleSignUpForm from './Authentication/GoogleSignUp/GoogleSignUpForm';
import { App, AppStack, AuthStack } from '../utils/navigator';
import Menu from './Menu/Menu';
import TripHistory from './Menu/TripHistory/TripHistory';
import RideTypeWindow from './RideTypeWindow/RideTypeWindow';
import DriverProfile from './TrackDriver/DriverProfile/DriverProfile';

export default class Main extends React.PureComponent {
	render() {
		return (
			<AppStack />
		);
	}
}