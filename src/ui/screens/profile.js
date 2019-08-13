import React, { Component } from 'react';
import { Modal, Keyboard, View, Text, Image, TextInput, TouchableHighlight, Alert, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'
import strings from '../../assets/strings';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import NavigatorService from '../../services/navigatorService';
import CustomHeader from '../components/customHeader';
import colors from '../style/colors'
import firebaseClass from '../../services/firebase';
import dataInterface from '../../dataInterface';
import firebase from 'react-native-firebase';
import { observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

@observer
class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            userEmail: dataInterface.userEmail,
            userImage: dataInterface.userImage,
            userLocation: dataInterface.userLocation,
            userName: dataInterface.userName,
            userPhone: dataInterface.userPhone,

            isVisible: false,

            newPassword: '',
            newPassword2: '',
            currentPassword: '',


            borderWidth1: 0,
            borderWidth2: 0,
            borderWidth3: 0,
            borderWidth4: 0,
            editable: false,
            color: 'black',
            keyboard: false,
            orientation: '',

            modalVisible: false,

        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.orientationChange = Dimensions.addEventListener('change', this._getOrientation)
        this._getOrientation();
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();

    }

    _getOrientation = () => {
        if (Dimensions.get('window').width > Dimensions.get('window').height)
            return this.setState({ orientation: 'portrait' })
        return this.setState({ orientation: 'landscape' })

    }

    _keyboardDidShow = () =>
        this.setState({
            keyboard: true,
        })


    _keyboardDidHide = () =>
        this.setState({
            keyboard: false
        })

    _edit() {

        firebaseClass.editProfile(
            this.state.userName,
            this.state.userLocation,
            this.state.userPhone,
            this.state.userEmail
        )

        Keyboard.dismiss()

        dataInterface.setUserName(this.state.userName);
        dataInterface.setParcialUserName(this.state.userName);
        dataInterface.setUserEmail(this.state.userEmail);
        dataInterface.setUserLocation(this.state.userLocation);
        dataInterface.setUserPhone(this.state.userPhone);

        Alert.alert(
            'Registro Actualizado',
            'Se ha actualizado correctamente el perfil de ' + this.state.userName);

        this.setState({
            editable: false,
            color: 'black',
            flex: 1,
        })
    }

    _cancel() {
        Keyboard.dismiss()

        this.setState({
            userEmail: dataInterface.userEmail,
            userImage: dataInterface.userImage,
            userLocation: dataInterface.userLocation,
            userName: dataInterface.userName,
            userPhone: dataInterface.userPhone,
            editable: false,
            color: 'black',
            flex: 1,
        })

    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred)
    }



    changePassword = () => {

        if (this.state.newPassword == '' || this.state.currentPassword == '')
            return null

        if (this.state.newPassword == this.state.newPassword2) {
            this.reauthenticate(this.state.currentPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(this.state.newPassword).then(() => {
                    Alert.alert("Password updated!");
                    this.setState({ isVisible: false, newPassword: '', currentPassword: '' })
                }).catch((error) => {
                    Alert.alert(error.message);
                });
            }).catch((error) => {
                Alert.alert(error.message);
            });
        }
        else {
            Alert.alert("Las contraseñas no coinciden");
        }
    }

    renderPassModal() {
        return (<Modal
            visible={this.state.isVisible}
            onRequestClose={() => this.setState({ isVisible: false })}
            presentationStyle="overFullScreen"
        >

            <View style={styles.modal}>

                <View style={{ backgroundColor: colors.BLUE_LIGHT }}>
                    <View style={styles.advise}>
                        <Icon
                            reverse
                            name='exclamation'
                            type='font-awesome'
                            color={colors.BLUE_STRONG}
                        />
                        <Text onPress={this.changePassword}
                            style={styles.textModal}>
                            Por tu seguridad, te recomendamos cambiar tu contraseña periódicamente
                        </Text>
                    </View>

                    <TextInput
                        onChangeText={(currentPassword) => this.setState({ currentPassword })}
                        value={this.state.currentPassword}
                        placeholder="Your old password"
                        maxLength={20}
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                </View>

                <View>
                    <TextInput
                        placeholder="New password"
                        maxLength={20}
                        onChangeText={(newPassword) => this.setState({ newPassword })}
                        value={this.state.newPassword}
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="Repeat new password"
                        maxLength={20}
                        onChangeText={(newPassword2) => this.setState({ newPassword2 })}
                        value={this.state.newPassword2}
                        secureTextEntry={true}
                        style={styles.textInput}
                    />

                    <TouchableHighlight onPress={this.changePassword}
                        style={{ backgroundColor: colors.BLUE_STRONG, justifyContent: 'center', alignSelf: 'center', width: responsiveWidth(80), height: responsiveWidth(15) }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Change Password</Text>
                    </TouchableHighlight>
                </View>

            </View>

        </Modal>)
    }

    async _goToHistoric() {

        this.setState({ modalVisible: true })


        firebaseClass.getHistoricCollection(dataInterface.userUid).then(() => {
            NavigatorService.navigate('Historic')
            setTimeout(() => {
                         this.setState({ modalVisible: false })
                     }, 500)
        });
        
    }

    
    renderHistoricModal() {
        return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <LottieView source={require('../../resources/animations/loader.json')} autoPlay />
        </View>
        )
    }

    render() {
        if(this.state.modalVisible)
        {
            return(this.renderHistoricModal())
        }
        return (

            <View style={{ flex: 1 }}>

                {!this.state.keyboard && this.state.orientation == 'landscape' &&
                    <CustomHeader backButton={true} />
                }

                {!this.state.keyboard && this.state.orientation == 'landscape' &&
                    <View style={{ backgroundColor: colors.BLUE_STRONG, justifyContent: 'center' }}>
                        <TouchableHighlight style={{ alignSelf: 'center' }} >
                            <Image style={styles.imageProfile}
                                source={{ uri: dataInterface.userImage }} />
                        </TouchableHighlight>
                        <Text style={{ fontSize: responsiveFontSize(4), color: colors.BLUE_STRONG }}>{dataInterface.userName.toUpperCase}</Text>
                    </View>
                }

                


                    <View style={{ flex: 4, alignItems: 'center', justifyContent: 'space-around' }}
                    >

                        <View>

                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    reverse
                                    name='user'
                                    type='font-awesome'
                                    color={colors.BLUE_STRONG}
                                /><TextInput
                                    style={{
                                        fontSize: responsiveFontSize(3), textAlignVertical: 'center',
                                        borderColor: colors.BLUE_STRONG,
                                        borderBottomWidth: this.state.borderWidth1,
                                        color: this.state.color
                                    }}
                                    onChangeText={(userName) => this.setState({ userName })}
                                    value={this.state.userName}
                                    editable={this.state.editable}
                                    onFocus={() => this.setState({ borderWidth1: 2 })}
                                    onBlur={() => this.setState({ borderWidth1: 0 })}
                                />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    reverse
                                    name='map-marker'
                                    type='font-awesome'
                                    color={colors.BLUE_STRONG}
                                /><TextInput
                                    style={{
                                        fontSize: responsiveFontSize(3), textAlignVertical: 'center',
                                        borderColor: colors.BLUE_STRONG,
                                        borderBottomWidth: this.state.borderWidth2,
                                        color: this.state.color
                                    }}
                                    onChangeText={(userLocation) => this.setState({ userLocation })}
                                    value={this.state.userLocation}
                                    editable={this.state.editable}
                                    onFocus={() => this.setState({ borderWidth2: 2 })}
                                    onBlur={() => this.setState({ borderWidth2: 0 })} />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    reverse
                                    name='envelope'
                                    type='font-awesome'
                                    color={colors.BLUE_STRONG}
                                /><TextInput
                                    style={{
                                        fontSize: responsiveFontSize(3), textAlignVertical: 'center',
                                        borderColor: colors.BLUE_STRONG,
                                        borderBottomWidth: this.state.borderWidth3,
                                        color: this.state.color
                                    }}
                                    onChangeText={(userEmail) => this.setState({ userEmail })}
                                    value={this.state.userEmail}
                                    editable={this.state.editable}
                                    onFocus={() => this.setState({ borderWidth3: 2 })}
                                    onBlur={() => this.setState({ borderWidth3: 0 })} />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    reverse
                                    name='mobile'
                                    type='font-awesome'
                                    color={colors.BLUE_STRONG}
                                /><TextInput
                                    style={{
                                        fontSize: responsiveFontSize(3), textAlignVertical: 'center',
                                        borderColor: colors.BLUE_STRONG,
                                        borderBottomWidth: this.state.borderWidth4,
                                        color: this.state.color

                                    }}
                                    onChangeText={(userPhone) => this.setState({ userPhone })}
                                    value={this.state.userPhone}
                                    editable={this.state.editable}
                                    onFocus={() => this.setState({ borderWidth4: 2 })}
                                    onBlur={() => this.setState({ borderWidth4: 0 })} />
                            </View>

                            {this.state.editable ?
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                                    <TouchableHighlight onPress={() => this._cancel()}><Icon
                                        raised
                                        name='times'
                                        type='font-awesome'
                                        color='red'
                                    />
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => this._edit()}><Icon
                                        raised
                                        name='check'
                                        type='font-awesome'
                                        color='green'
                                    />
                                    </TouchableHighlight>
                                </View> :

                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <Text onPress={() => this._goToHistoric()} style={styles.text}>
                                            Go to my historic
                                    </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <Text onPress={() => this.setState({ editable: true, color: 'gray' })}
                                            style={styles.text}>
                                            Edit Profile
                                    </Text>
                                        <Text style={{ textAlignVertical: 'center' }}>|</Text>
                                        <Text onPress={() => this.setState({ isVisible: true })}
                                            style={styles.text}>
                                            Change Password
                                    </Text>
                                    </View>
                                </View>
                            }

                        </View>
                    </View>
                

                {this.renderPassModal()}

            </View>

        );
    }
}

export default Profile;

const styles = StyleSheet.create({
    text: {
        color: '#00F',
        textAlign: 'center',
        margin: 10
    },
    imageProfile: {
        borderRadius: responsiveWidth(30) / 2,
        borderColor: 'white',
        borderWidth: 5,
        width: responsiveWidth(30),
        height: responsiveWidth(30)
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.BLUE_STRONG,
        margin: 20,
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