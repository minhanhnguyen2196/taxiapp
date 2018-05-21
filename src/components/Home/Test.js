import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity, AppState
} from 'react-native';
import PushNotification from 'react-native-push-notification';

const screen = Dimensions.get('window');


class Test extends React.Component {

constructor(props) {
  super(props);

  this.handle = this.handle.bind(this);
}
componentDidMount() {
  AppState.addEventListener('change', this.handle);
  PushNotification.configure({
    onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);
    },
  });
}
componentWillUnmount() {
  AppState.removeEventListener('change', this.handle);
}

handle(appState) {
  if (appState === 'background') {
    PushNotification.localNotificationSchedule({
      message: "My Notification Message", 
      date: new Date(Date.now() + (2 * 1000)) 
    });
  }
}
  render() {
    return (
      <View style={styles.container}>
        <Text> Hello World </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
 
});

export default Test;