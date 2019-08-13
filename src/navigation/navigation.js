// import React, { Component } from 'react';
// import { createDrawerNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
// import NavigatorService from '../services/navigatorService'

// import Login from '../ui/screens/login'
// import Menu from '../ui/screens/menu'
// import Users from '../ui/screens/users';
// import Historic from '../ui/screens/historic';
// import EditRegistry from '../ui/screens/editRegistry';
// import Profile from '../ui/screens/profile'

// class Navigation extends React.Component {

//   static navigationOptions = {
//     header: {
//       visible: false,
//     }
//   }
//   render() {

//     const AdminNavigator = createStackNavigator(
//       {
//         Menu:Menu,
//         Users:Users,
//         Historic:Historic,
//         EditRegistry:EditRegistry,
//         Profile:Profile,

//       },
//       {
//         headerMode: 'none',
//           navigationOptions: {
//             headerVisible: false,
//           },
//       }
//     )

//     const List = createStackNavigator(
//       {
//         Menu:Menu,
//         Historic:Historic,
//         Profile:Profile,
//       },
//       {
//         headerMode: 'none',
//           navigationOptions: {
//             headerVisible: false,
//           },
//       }
//     )

//     const SilviaNavigator = createStackNavigator({
//         Login: Login,
//         List:List,
//         AdminNavigator:AdminNavigator,
//       },
//         {
//           headerMode: 'none',
//           navigationOptions: {
//             headerVisible: false,
//           },
//         }
//       )

//     const MyApp = createAppContainer(SilviaNavigator);
//     return (
//       <MyApp ref={navigatorRef => {
//         NavigatorService.setContainer(navigatorRef);
//       }} />

//     );
//   }
// }

// export default Navigation;



import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import NavigatorService from '../services/navigatorService'

import Login from '../ui/screens/login'
import Menu from '../ui/screens/menu'
import Users from '../ui/screens/users';
import Historic from '../ui/screens/historic';
import EditRegistry from '../ui/screens/editRegistry';
import Profile from '../ui/screens/profile'
import AuthLoadingScreen from '../ui/screens/authLoading';
import NewHistoric from '../ui/screens/newHistoric';
import MenuAdmin from '../ui/screens/menuAdmin'
import NewUser from '../ui/screens/newUser'

class Navigation extends React.Component {

  static navigationOptions = {
    header: {
      visible: false,
    }
  }
  render() {


    const AuthStack = createStackNavigator(
      { 
        Login: Login 
      }
    );

    const AppStack = createStackNavigator(
      {
        Menu: Menu,
        Users: Users,
        Historic: Historic,
        EditRegistry: EditRegistry,
        Profile: Profile,
        NewHistoric:NewHistoric,
        MenuAdmin:MenuAdmin,
        NewUser:NewUser,
      },
      {
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        },
      }
    )

    const SilviaNavigator = createAppContainer(createSwitchNavigator({
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
      {
        initialRouteName: 'AuthLoading',
      }
    ))




    const MyApp = createAppContainer(SilviaNavigator);
    return (
      <MyApp ref={navigatorRef => {
        NavigatorService.setContainer(navigatorRef);
      }} />

    );
  }
}

export default Navigation;

