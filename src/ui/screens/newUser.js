import React, { Component } from 'react';
import { Keyboard, View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, Dimensions } from 'react-native';
import { Icon, Input } from 'react-native-elements'
import CustomHeader from '../components/customHeader';
import strings from '../../assets/strings';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import NavigatorService from '../../services/navigatorService';
import colors from '../style/colors'
import DatePicker from 'react-native-datepicker'
import firebaseClass from '../../services/firebase';
import dataInterface from '../../dataInterface';
import firebase from 'react-native-firebase'
import formatDates from '../../dataInterface/formatDates';


const date = new Date()

class newUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            password: '',
            password2: '',
            errorUser: ''
        };
    }


    _newUser() {
        if (!this._controlFormat())
        {
            firebaseClass.newUser(this.state.email, this.state.name, this.state.password)
                .then((response) => {
                    Alert.alert(
                        'Success',
                        'User succesfully created',
                        [
                            { text: 'OK', onPress: () => NavigatorService.back() },
                        ]
                    );
                }).catch((error) => {
                    
                    this.setState({ errorUser: error.message })
                })
        }
        Keyboard.dismiss()
    }

    _controlFormat() {
        var errorUser = ""
        var errorBool = false;

        if (this.state.email == "" || this.state.password == "") {
            errorUser = "All fields are required"
            errorBool = true
        }

        if (this.state.password2 != this.state.password) {
            errorUser = "Different passwords"
            errorBool = true
        }

        this.setState({ errorUser: errorUser })

        return errorBool

    }

    render() {
        return (

            <View style={styles.modal}>

                <View style={{ backgroundColor: colors.BLUE_LIGHT }}>

                    {this.state.errorUser == "" ?

                        <View style={styles.advise}>
                            <Icon
                                reverse
                                name='edit'
                                type='font-awesome'
                                color={colors.BLUE_STRONG}
                            />
                            <Text onPress={this.changePassword}
                                style={styles.textModal}>
                                Podrás cambiar y añadir más información cuando quieras en tu perfil.
                    </Text>
                        </View>

                        :
                        <View style={styles.advise}>
                            <Icon
                                reverse
                                name='exclamation'
                                type='font-awesome'
                                color={colors.BLUE_STRONG}
                            />
                            <Text onPress={this.changePassword}
                                style={{
                                    color: 'red',
                                    alignSelf: 'center',
                                    width: responsiveWidth(60)
                                }}>
                                {this.state.errorUser}
                            </Text>

                        </View>
                    }


                </View>


                <View>

                    <Input
                        placeholder="Email"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        maxLength={30}
                        inputContainerStyle={styles.textInput}

                        errorStyle={{ color: colors.RED }}
                    //errorMessage={this.state.errorEmail}
                    />

                    <Input
                        placeholder="Name"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        maxLength={20}
                        inputContainerStyle={styles.textInput}

                        errorStyle={{ color: colors.RED }}
                    //errorMessage={this.state.errorName}
                    />
                    <Input
                        placeholder="Password"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        maxLength={8}
                        inputContainerStyle={styles.textInput}

                        secureTextEntry={true}
                        errorStyle={{ color: colors.RED }}
                    //errorMessage={this.state.errorPass}
                    />
                    <Input
                        placeholder="Password"
                        onChangeText={(password2) => this.setState({ password2 })}
                        value={this.state.password2}
                        maxLength={8}
                        inputContainerStyle={styles.textInput}

                        secureTextEntry={true}
                    //errorStyle={{ color: colors.RED }}
                    //errorMessage={this.state.errorUser}
                    />

                    <TouchableHighlight onPress={() => this._newUser()}
                        style={{
                            backgroundColor: colors.BLUE_STRONG,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            width: responsiveWidth(80),
                            height: responsiveWidth(15)
                        }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>New User</Text>
                    </TouchableHighlight>
                </View>

            </View>


        );
    }
}

const styles = StyleSheet.create(
    {
        textInput: {
            borderWidth: 2,
            borderColor: colors.BLUE_STRONG,
            margin: 15,
            width: responsiveWidth(80)
        },
        modal: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        advise: {
            flexDirection: 'row',
            alignContent: 'center',
            margin: 20
        },
        textModal: {
            color: colors.BLUE_STRONG,
            alignSelf: 'center',
            width: responsiveWidth(60)
        }
    });

export default newUser;