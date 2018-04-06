import { StackNavigator, SwitchNavigator, DrawerNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Authentication from '../components/Authentication/Authentication';
import GoogleSignUp from '../components/Authentication/GoogleSignUp/GoogleSignUp';
import GoogleSignUpForm from '../components/Authentication/GoogleSignUp/GoogleSignUpForm';
import AuthLoadingScreen from '../components/Authentication/AuthLoadingScreen';
import Home from '../components/Home/Home';
import InitialScreen from '../components/InitialScreen/InitialScreen';
import PlacePickerBox from '../components/PlacePickerBox/PlacePickerBox';
import Menu from '../components/Menu/Menu';
import HeaderComponent from '../components/Header/Header';
import Test from '../components/Home/Test';
import TrackDriverContainer from '../components/TrackDriver/TrackDriverContainer';
import PaymentScreen from '../components/Menu/PaymentScreen/PaymentScreen';
import PayWithCash from '../components/Menu/PaymentScreen/PayWithCash';

export const SideMenu = StackNavigator({
  InitialScreen,
  Home,
  HeaderComponent,
  PlacePickerBox,
  Menu,
  TrackDriverContainer,
  PaymentScreen
},
{
  navigationOptions: ({ navigation }) => ({
      header: null
    }),


});

export const AppStack = DrawerNavigator({
  InitialScreen,
  Home,
  TrackDriverContainer,
  Menu,
  PaymentScreen,
  PayWithCash
}, 
{
  initialRouteName: 'InitialScreen',
  drawerPosition: 'left',
  drawerWidth: 200,
  contentComponent: Menu
});

export const AuthStack = StackNavigator({ 
  Authentication: {
  screen: Authentication,
},
  GoogleSignUp: {
    screen: GoogleSignUp
  },
  SignUpForm: {
    screen: GoogleSignUpForm
  }
},
{
   transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
   }),
    navigationOptions: ({ navigation }) => ({
      header: null
  })
});

export const App = SwitchNavigator({
  AuthLoading: AuthLoadingScreen,
	Auth: AuthStack,
	App: AppStack 
},
  {
    initialRouteName: 'AuthLoading'
  });


