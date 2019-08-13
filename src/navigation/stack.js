import React from 'react';
import { View } from 'react-native'
// Navigators
import { createStackNavigator, createAppContainer } from 'react-navigation';

import GoogleMapScreen from '../ui/screens/GoogleMapScreen';
import OpenStreetMapScreen from '../ui/screens/OpenStreetMap';


//Navigationservice
import NavigatorService from '../services/navigatorService'
const StackNavigator = createStackNavigator({
  GoogleMapScreen: { screen: GoogleMapScreen },
  
},
  {
    initialRouteName: 'GoogleMapScreen'
  }
);

const AppContainer = createAppContainer(StackNavigator);
export default class Stack extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
        />
      </View>
    );
  }
}
