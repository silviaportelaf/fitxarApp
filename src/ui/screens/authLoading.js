import React, { Component } from 'react';
import firebase from 'react-native-firebase'
import firebaseClass from '../../services/firebase'
import NavigatorService from '../../services/navigatorService';
import { View } from 'native-base';
import dataInterface from '../../dataInterface';
import LottieView from 'lottie-react-native';

class AuthLoadingScreen extends React.Component {

    constructor() {
        super();
        this._bootstrapAsync();
    }

   
    _bootstrapAsync = async () => {
        var user = await firebase.auth().currentUser;
        
        if (user) {
            firebaseClass.getUser(user.uid)
                .then((doc) => {
                    dataInterface.setUserOnDataInterface(doc)
                    firebaseClass.getUsersCollection();
                    NavigatorService.navigate('App');
                }).catch((error) => {
                    console.log('error')
                })
        }
        else { NavigatorService.navigate('Auth'); }
    
    };

  
    render() {
        return (<View>
         
        </View>)
    }


}

export default AuthLoadingScreen;