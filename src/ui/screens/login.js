import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements'
import strings from '../../assets/strings';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import NavigatorService from '../../services/navigatorService';
import colors from '../style/colors'
import { getUser, storeUser } from '../../utils/AsyncStorage'
import LottieView from 'lottie-react-native';
import firebaseClass from '../../services/firebase';
import dataInterface from '../../dataInterface';

class Login extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         text: 'a@a.es',
         pass: '',
         isLoading: false,
         loadingPage: true,
         error: '',
         borderWidth: 1,
         borderWidth2: 1,
         borderColor: 'gray',
         borderColor2: 'gray'
      };

   }


   _setUserOnDataInterfaceAndGo(doc) {

      dataInterface.setUserOnDataInterface(doc)
      return NavigatorService.navigate('App')
   }

   _onPressButton() {
      this.setState({ loadingPage: false, })

      firebaseClass.login(this.state.text, this.state.pass)
         .then((result) => {
            storeUser(result.data().uid)
            firebaseClass.getUsersCollection();
            this._setUserOnDataInterfaceAndGo(result)
         }).catch((error) => {
            this.setState({ error: error.message })
         })

      this.setState({ loadingPage: true, })
   }




   render() {
      return (

         <View style={{ flex: 1, justifyContent: 'space-around' }}>

            {this.state.loadingPage ?

               <View style={{ alignSelf: 'center' }}>

                  <Image
                     style={{ alignSelf: 'center' }}
                     source={require('../../resources/images/logo.png')}
                  />

                  <View style={{ width: responsiveWidth(80) }} >
                     <Input
                        inputContainerStyle={{
                           borderBottomWidth: this.state.borderWidth,
                           borderBottomColor: this.state.borderColor
                        }}
                        placeholder={strings.user}
                        onChangeText={(texto) => this.setState({ text: texto })}
                        value={this.state.text}
                        onFocus={() => this.setState({ borderWidth: 3, borderColor: colors.BLUE_STRONG })}
                        onBlur={() => this.setState({ borderWidth: 1, borderColor: 'gray' })}
                        leftIcon={
                           <Icon
                              name='user'
                              type='font-awesome'
                              size={responsiveFontSize(4)}
                              color={colors.BLUE_STRONG}
                           />
                        }
                     />
                     <Input
                        inputContainerStyle={{
                           borderBottomWidth: this.state.borderWidth2,
                           borderBottomColor: this.state.borderColor2,
                        }}
                        placeholder={strings.pass}
                        onChangeText={(pass) => this.setState({ pass })}
                        value={this.state.pass}
                        onFocus={() => this.setState({ borderWidth2: 3, borderColor2: colors.BLUE_STRONG })}
                        onBlur={() => this.setState({ borderWidth2: 1, borderColor2: 'gray' })}
                        leftIcon={
                           <Icon
                              name='lock'
                              type='font-awesome'
                              size={responsiveFontSize(4)}
                              color={colors.BLUE_STRONG} />
                        }
                        secureTextEntry={true}
                        errorStyle={{ color: colors.RED, alignSelf: 'center' }}
                        errorMessage={this.state.error}
                     />
                  </View>

                  <View style={{alignSelf: 'center' }}>
                     {this.state.text && this.state.isLoading == false ?
                        <TouchableOpacity
                           style={styles.buttonLogin}
                           onPress={() => this._onPressButton()}>
                           <Text style={ styles.textLogin }> LOGIN </Text>
                        </TouchableOpacity>
                        : null}
                     {this.state.isLoading == true ?

                        <LottieView style={{ width: responsiveWidth(60), alignSelf: 'center' }}
                           source={require('../../resources/animations/3loading.json')}
                           autoPlay loop />
                        : null}
                  </View>


               </View>

               :
               <View style={{ flex: 1, justifyContent: 'center' }}>
                  <LottieView style={{ width: responsiveWidth(100), alignSelf: 'flex-end' }} source={require('../../resources/animations/3loading.json')} autoPlay />
               </View>
            }
         </View>
      );
   }
}

export default Login;

const styles = StyleSheet.create({

   textLogin: {
      color: 'white',
      fontWeight: 'bold', 
      textAlign: 'center',
      fontSize: responsiveFontSize(2),
   },

   buttonLogin:{
      backgroundColor: colors.BLUE_STRONG, 
      marginTop: 20,
      justifyContent: 'center',
      width: responsiveWidth(70), 
      height: responsiveHeight(6)
   }
  

});