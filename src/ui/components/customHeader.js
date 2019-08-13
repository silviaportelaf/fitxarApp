
import React from 'react';
import {
    View,
    TouchableOpacity,
    StatusBar,
    Platform,
    Text
} from 'react-native';

//Navigators
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../style/colors'
import NavigatorService from '../../services/navigatorService';
import { StackActions, NavigationActions } from 'react-navigation';
import firebaseClass from '../../services/firebase';
import dataInterface from '../../dataInterface';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

function StatusBarPlaceHolder() {

    return (
        Platform.OS === 'ios' ?
            <View style={{
                width: "100%",
                height: STATUS_BAR_HEIGHT,
                backgroundColor: colors.BLUE_STRONG
            }}>
                <StatusBar
                    barStyle="light-content"
                />
            </View>
            : <StatusBar
                backgroundColor={colors.BLUE_STRONG}
                barStyle="light-content"
            />
    );
}

export default class CustomHeader extends React.Component {
    navigateToScreen = routeName => {
        const navigateAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Salaketak' })]
        })
        this.props.navigation.dispatch(navigateAction)
    }
    render() {
        return (
            <View>
                <StatusBarPlaceHolder />
                <View style={{
                    width: '100%',
                    height: responsiveHeight(8),
                    flexDirection: 'row',
                    backgroundColor: colors.BLUE_STRONG,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        style={{ paddingStart: responsiveWidth(3) }}
                        onPress={() => this.props.backButton ? NavigatorService.back() : firebaseClass.logOut()}>
                        <Icon name={this.props.backButton ? 'arrow-left' : 'logout'}
                            color='white'
                            onPress={() => this.props.backButton ? NavigatorService.back() : firebaseClass.logOut()}
                            paddingStart={responsiveWidth(3)}
                            size={30} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>{this.props.title}</Text>
                    </View>
                    {this.props.otherButton == 'profile' ?
                        <TouchableOpacity
                            style={{ paddingEnd: responsiveWidth(3) }}
                            onPress={() => NavigatorService.navigate('Profile')}>
                            <Icon name='account-settings'
                                color='white'
                                onPress={() => NavigatorService.navigate('Profile')}
                                paddingEnd={responsiveWidth(3)}
                                size={30} />
                        </TouchableOpacity>
                        : null}

                    {this.props.otherButton == 'new' && dataInterface.userType == 0 ?
                        <TouchableOpacity
                            style={{ paddingEnd: responsiveWidth(3) }}
                            onPress={() => NavigatorService.navigate('NewUser')}>
                            <Icon name='plus'
                                color='white'
                                onPress={() => NavigatorService.navigate('NewUser')}
                                paddingEnd={responsiveWidth(3)}
                                size={30} />
                        </TouchableOpacity>
                        : null}

                    {this.props.otherButton == 'newHistoric' && dataInterface.userType == 0 ?
                        <TouchableOpacity
                            style={{ paddingEnd: responsiveWidth(3) }}
                            onPress={() => NavigatorService.navigate('NewHistoric')}>
                            <Icon name='plus'
                                color='white'
                                onPress={() => NavigatorService.navigate('NewHistoric')}
                                paddingEnd={responsiveWidth(3)}
                                size={30} />
                        </TouchableOpacity>
                        : null}

                </View>
            </View>
        );
    }
}

