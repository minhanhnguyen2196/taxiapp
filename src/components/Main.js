import React, { Component } from 'react';
import Home from './Home/Home';
import FoundDriverScreen from './FoundDriverScreen/FoundDriverScreen';
import ModalExample from './Home/Test';
import ValidationCode from './Authentication/ValidationCode';
import StartScreen from './Authentication/StartScreen';
import { App, AppStack, AuthStack } from '../utils/navigator';
import Menu from './Menu/Menu';
import PaymentScreen from './Menu/PaymentScreen/PaymentScreen';
import TripHistory from './Menu/TripHistory/TripHistory';
import RideTypeWindow from './RideTypeWindow/RideTypeWindow';
import TripTracker from './TrackDriver/TripTracker/TripTracker';
import DriverRating from './TrackDriver/DriverRating/DriverRating';
import { SearchBox } from './SearchBox/SearchBox';

export default class Main extends React.PureComponent {
	render() {
		return (
			<App />
		);
	}
}