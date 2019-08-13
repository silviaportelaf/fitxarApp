import React, { Component } from 'react';
import { Alert, View, Text, Image, Modal, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-elements'
import strings from '../../assets/strings';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import NavigatorService from '../../services/navigatorService';

import CustomHeader from '../components/customHeader';
import LottieView from 'lottie-react-native';
import Clock from '../components/clock';
import colors from '../style/colors'
import firebaseClass from '../../services/firebase';
import dataInterface from '../../dataInterface';



class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            loading: true,
            loadingHistorics: false,
        };

    }

    _in() {

        this._changeWorking()
        this._registry();
        this.setModalVisible();

    }

    _changeWorking() {
        
        firebaseClass.updateWorking(dataInterface.userID, dataInterface.userWorking)
        dataInterface.setUserWorking(!dataInterface.userWorking);
    }


    _registry() {

        firebaseClass.registryIn(dataInterface.userUid)
    }

    _out() {

        this.setModalVisible();
        this._changeWorking()

        firebaseClass.registryOut(dataInterface.userUid).then(() => {
            this.setModalVisibleOut();
        })

    }


    _goToUsers() {

        NavigatorService.navigate('Users');     
    }


    //Registry Animations
    setModalVisible() {
        this.setState({ modalVisible: true });
        timer = setTimeout(() => { this.setLoadingFalse() }, 2000)
    }
    setModalVisibleOut() {
        this.setState({ modalVisible: true });
        timer = setTimeout(() => { this.setLoadingFalse() }, 2000)
    }
    setLoadingFalse() {
        this.setState({ loading: false });
        timer = setTimeout(() => {
            this.setState({ modalVisible: false, loading: true })
        }, 2000)
    }

    //Historic Animation
    // setModalVisibleHistoric() {
    //     this.setState({ modalVisible: true });
    //     timer = setTimeout(() => {
    //         this.setState({ modalVisible: false })
    //     }, 2000)
    // }
    // setModalInvisibleHistoric() {
    //     this.setState({ modalVisible: false })
    // }


    render() {

        return (
            <View style={{ flex: 1 }}>

                <CustomHeader backButton={false} otherButton='profile' 
                title={dataInterface.userName} />

                <Modal
                    animationType="fade"
                    transparent={false}
                    presentationStyle="overFullScreen"
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                // onShow={() => setTimeout(() => {this.setModalVisible(false)}, 2000)}
                >
                    {this.state.loading ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <LottieView source={require('../../resources/animations/loader.json')} autoPlay />
                        </View>
                        : dataInterface.userWorking ?

                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <LottieView source={require('../../resources/animations/ok1.json')} autoPlay loop={false} />
                            </View>
                            :
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <LottieView source={require('../../resources/animations/close3.json')} autoPlay />
                            </View>
                    }
                    {this.state.loadingHistorics ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <LottieView source={require('../../resources/animations/loader.json')} autoPlay />
                        </View> : null}
                </Modal>

                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.BLUE_STRONG }}>
                    
                    <View style={{ flex: 3 }}><Clock /></View>

                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <TouchableOpacity disabled={dataInterface.userWorking} onPress={() => !dataInterface.userWorking ? this._in() : null}>
                            <Icon
                                reverse
                                name='play'
                                type='font-awesome'
                                color={!dataInterface.userWorking ? colors.RED : colors.BLUE_LIGHT}
                                size={50}
                            >
                            </Icon>
                        </TouchableOpacity>

                        <TouchableOpacity disabled={!dataInterface.userWorking} onPress={() => dataInterface.userWorking ? this._out() : null}>
                            <Icon
                                reverse
                                name='stop'
                                type='font-awesome'
                                color={dataInterface.userWorking ? colors.RED : colors.BLUE_LIGHT}
                                size={50}>
                            </Icon>
                        </TouchableOpacity>

                    </View>


                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
                        
                        {dataInterface._userType == 0 ?
                            <TouchableOpacity onPress={() => this._goToUsers()}>
                                <Icon
                                    reverse
                                    name='user-secret'
                                    type='font-awesome'
                                    color={colors.BLUE_MEDIUM}
                                    size={30}>
                                </Icon>
                            </TouchableOpacity>

                            : null}

                        {/* <TouchableOpacity onPress={() => this._goToHistoric()}>
                            <Icon
                                reverse
                                name='list'
                                type='font-awesome'
                                color={colors.ORANGE}
                                size={30}>
                            </Icon>
                        </TouchableOpacity> */}

                    </View>
                </View>
            </View>
        );
    }
}

export default Menu;