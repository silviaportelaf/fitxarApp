import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
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
class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: '',
        }
    }

    async _goToHistoric(uid,name) {
     
        await dataInterface.setParcialUserUID(uid)
        await dataInterface.setParcialUserName(name)

        firebaseClass.getHistoricCollection(uid).then(() => {
             NavigatorService.navigate('Historic')
        });
    }


    _renderItem(item) {

        return (
            <View key={item.uid} style={{ flex: 1, marginTop: '5%', marginHorizontal: '5%', flexDirection: 'column' }}>
                <TouchableHighlight onPress={() => this._goToHistoric(item.uid,item.name)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Image style={{ borderRadius: 30, width: 50, height: 50 }} 
                        source={{ uri: item.image }} />
                        <Text style={{ fontSize: responsiveFontSize(3), color: colors.BLUE_STRONG }}>{item.name}</Text>
                        <Icon name="chevron-right" type='font-awesome' size={ICON_SIZE} color="gray" />
                    </View>
                </TouchableHighlight>
            </View>

        );
    }

    
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: colors.COLOR2 }}>
                <CustomHeader backButton={true} otherButton='new' title='Usuarias' />

                <ScrollView style={{ flex: 1 }}>
                    {
                        dataInterface.userList.filter(item =>
                            item.name.includes(this.state.filter)).map((item, index) =>
                                this._renderItem(item))
                    }

                </ScrollView>

            </View>

        );
    }
}

export default Users;