import React, { Component } from 'react';
import {View,Text ,ScrollView} from 'react-native';
import { createDrawerNavigator,createAppContainer,DrawerItems, SafeAreaView } from 'react-navigation'
import {Container} from 'native-base';
import GoogleMapScreen from '../ui/screens/GoogleMapScreen';
import OpenStreetMapScreen from '../ui/screens/OpenStreetMap';
import Stack from '../navigation/stack'
import Tab from '../navigation/tab'
import NavigatorService from '../services/navigatorService'

// const CustomDrawerContentComponent = (props) => (
//      <ScrollView>
//         <View style={{height:80,backgroundColor:'#1a8cff',alignItems:'center',justifyContent:'center'}}>
//          <Text style={{ color:'white',fontSize:30}}>Maps</Text>
//         </View>
//         <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
//         <DrawerItems {...props} />
//        </SafeAreaView>
//      </ScrollView>
// );

const MyDrawerNavigator = createDrawerNavigator(
   {
    GoogleMap:GoogleMapScreen,
    OpenStreetMap:OpenStreetMapScreen,
    Stack:Stack,
    Tab:Tab
   },
   // {
   //  contentComponent:CustomDrawerContentComponent
   // }
);

const MyApp = createAppContainer(MyDrawerNavigator);

class Drawer extends React.Component{
   render(){
      return(
        <Container>
          <MyApp ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }} />
        </Container>
     );
   }
}

export default Drawer;

