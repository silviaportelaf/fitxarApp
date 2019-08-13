import React, { Component } from 'react';
import {View,Text ,ScrollView} from 'react-native';
import { createBottomTabNavigator,createAppContainer,TabItems, SafeAreaView } from 'react-navigation'
import {Container} from 'native-base';
import GoogleMapScreen from '../ui/screens/GoogleMapScreen';
import OpenStreetMapScreen from '../ui/screens/OpenStreetMap';
import NavigatorService from '../services/navigatorService'


// const CustomTabContentComponent = (props) => (
//      <ScrollView>
//         <View style={{height:80,backgroundColor:'#1a8cff',alignItems:'center',justifyContent:'center'}}>
//          <Text style={{ color:'white',fontSize:30}}>Maps</Text>
//         </View>
//         <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
//         <DrawerItems {...props} />
//        </SafeAreaView>
//      </ScrollView>
// );

const MyTabNavigator = createBottomTabNavigator(
   {
    GoogleMap:GoogleMapScreen,
    OpenStreetMap:OpenStreetMapScreen,
   },
   // {
   //  contentComponent:CustomTabContentComponent
   // }
);

const MyApp = createAppContainer(MyTabNavigator);

class Tab extends React.Component{
   render(){
      return(
        <Container>
          <MyApp 
            ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}/>
        </Container>
     );
   }
}

export default Tab;

