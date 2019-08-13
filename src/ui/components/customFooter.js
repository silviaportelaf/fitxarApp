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
import navigatorService from '../../services/navigatorService';
import { StackActions, NavigationActions } from 'react-navigation';


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

function StatusBarPlaceHolder() {
   
    // color=color+2;
    return (
        Platform.OS === 'ios' ?
            <View style={{
                width: "100%",
                height: STATUS_BAR_HEIGHT,
                backgroundColor: "colors.BLUE_STRONG"
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

export default class CustomFooter extends React.Component {
    navigateToScreen = routeName => {
        // const navigateAction = StackActions.reset({
        //     index: 0,
        //     key: null,
        //     actions: [NavigationActions.navigate({ routeName: 'Salaketak' })]
        // })
        // this.props.navigation.dispatch(navigateAction)
    }
    render() {
        return (
            <View>
                <StatusBarPlaceHolder />
                <View style={{width: responsiveWidth(100), height: responsiveHeight(8), flexDirection: 'row', backgroundColor: colors.BLUE_STRONG, alignItems: 'center' }}>
                    {/* <TouchableOpacity
                        style={{ paddingStart: responsiveWidth(3) }}
                        onPress={() => this.props.backButton ? navigatorService.back() : navigatorService.openDrawer()}>
                        <Icon name={this.props.backButton ? 'arrow-left' : 'logout'}
                            color='white'
                            onPress={() => this.props.backButton ? navigatorService.back() : navigatorService.openDrawer()}
                            paddingStart={responsiveWidth(3)} />
                    </TouchableOpacity> */}
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>SKURA MOBILE</Text>
                    </View>
                    {/* <TouchableOpacity
                        style={{ paddingEnd: responsiveWidth(3) }}
                        onPress={() => this.props.backButton ? navigatorService.back() : navigatorService.openDrawer()}>
                        <Icon name={this.props.backButton ? 'arrow-left' : 'robot'}
                            color='white'
                            onPress={() => this.props.backButton ? navigatorService.back() : navigatorService.openDrawer()}
                            paddingStart={responsiveWidth(3)} />
                    </TouchableOpacity> */}

                </View>
            </View>
        );
    }
}

