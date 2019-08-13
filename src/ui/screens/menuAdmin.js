import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import CustomHeader from '../components/customHeader';
import colors from '../style/colors'
import NavigatorService from '../../services/navigatorService';
import { TouchableHighlight } from 'react-native-gesture-handler';
import firebaseClass from '../../services/firebase'
import { observer } from 'mobx-react';
import dataInterface from '../../dataInterface/index'


const ICON_SIZE = 20;

@observer
class MenuAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: '',
        }
    }

    async _goToHistoric(uid) {

        await dataInterface.setParcialUserUID(uid)

        firebaseClass.getHistoricCollection(uid).then(() => {
            NavigatorService.navigate('Historic')
        });
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: colors.COLOR2 }}>
                <CustomHeader backButton={true} otherButton='new' title='Usuarias' />

                <ScrollView style={{ flex: 1 }}>

                    <View style={{ flex: 1, marginTop: '5%', marginHorizontal: '5%', flexDirection: 'column' }}>
                        <TouchableOpacity onPress={() => this._goToHistoric()}>
                            <Icon
                                reverse
                                name='list'
                                type='font-awesome'
                                color={colors.ORANGE}
                                size={100}>
                            </Icon>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, marginTop: '5%', marginHorizontal: '5%', flexDirection: 'column' }}>
                        <TouchableOpacity onPress={() => this._goToHistoric()}>
                            <Icon
                                reverse
                                name='account-settings'
                                type='font-awesome'
                                color={colors.ORANGE}
                                size={100}>
                            </Icon>
                        </TouchableOpacity>
                    </View>




                </ScrollView>

            </View>

        );
    }
}

export default MenuAdmin;