import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import CustomHeader from '../components/customHeader';
import DatePicker from 'react-native-datepicker';
import colors from '../style/colors'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import NavigatorService from '../../services/navigatorService';
import { observer } from 'mobx-react';
import { toJS } from 'mobx'
import dataInterface from '../../dataInterface'
import formatDates from '../../dataInterface/formatDates'


const ICON_SIZE = 30;
const MONTHS = ['', 'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
const date = new Date()


@observer
class Historic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            dataPicker: [],
            totalData: [],
            modalVisible: false,
            modalData: 0,
        }
    }

    componentWillUnmount(){
        dataInterface.setParcialUserName(dataInterface.userName)
        dataInterface.setParcialUserUID(dataInterface.userUid)
    }
  

    _goToEdit(index) {
         NavigatorService.navigate('EditRegistry', { logs: index });

    }

    _setModalInvisible() {
        this.setState({ modalVisible: false })
    }

    _renderLista(item, choose) {

        if (choose == true) {
            return (
                <Text key={item}  >{formatDates.getHora(item)}</Text>
            );
        }
        if (formatDates.getResta(item) != "00h 00m 00s")
            return (
                <Text key={item} >{formatDates.getResta(item)}</Text>
            );

        return (
            <Text key={item} ></Text>
        );
    }

    _renderItem(item, index) {
        return (
            <Collapse key={index} style={{ flex: 1, marginTop: '5%', marginHorizontal: '5%', backgroundColor: colors.BLUE_LIGHT }}>
                <CollapseHeader >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ padding: '4%', paddingHorizontal: '7%', backgroundColor: colors.BLUE_STRONG }}>
                            <Text style={{ fontSize: responsiveFontSize(3), color: colors.BLUE_LIGHT }}>{item.fecha.substring(8, 10)}</Text>
                            <Text style={{ fontSize: responsiveFontSize(2), color: colors.BLUE_LIGHT }}>{MONTHS[parseInt(item.fecha.substring(5, 7))]}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: responsiveFontSize(2), color: colors.BLUE_STRONG }} >
                                {formatDates.getResta(item.totalHoras)}</Text>
                        </View>
                        <View style={{ paddingHorizontal: '5%' }}>
                            <Icon name="caret-down" type='font-awesome' size={ICON_SIZE} color={colors.BLUE_STRONG} />
                        </View>
                    </View>
                </CollapseHeader>

                <CollapseBody style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '5%', backgroundColor: colors.BLUE_LIGHT }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Icon name="chevron-right" type='font-awesome' size={ICON_SIZE} color="grey" />
                            {item.entradas.map((item2) =>
                                this._renderLista(item2, true))
                            }
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Icon name="chevron-left" type='font-awesome' size={ICON_SIZE} color="grey" />
                            {item.salidas.map((item3) =>
                                this._renderLista(item3, true))
                            }
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Icon name="history" type='font-awesome' size={ICON_SIZE} color="grey" />
                            {item.restas.map((item4) =>
                                this._renderLista(item4, false))
                            }
                        </View>
                    </View>

                    {dataInterface.userType==0 ?
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => this._goToEdit(index)}>
                                <Icon
                                    reverse
                                    name='edit'
                                    type='font-awesome'
                                    color={colors.BLUE_MEDIUM}
                                    size={20}
                                >
                                </Icon>
                            </TouchableOpacity>
                        </View>
                        : null}

                </CollapseBody>
            </Collapse>

        );
    }


    renderDatePicker() {

        
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: '5%', flexDirection: 'row' }}>
                <DatePicker
                    style={{ width: responsiveWidth(50) }}
                    date={this.state.date}//initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2019-01-01"
                    maxDate={date}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => { this.setState({ date: date })}
                    }
                />
                <TouchableOpacity onPress={() => this.setState({ date: '' })}>
                    <Icon
                        reverse
                        name='times'
                        type='font-awesome'
                        color={this.state.date == '' ? '#88888844' : '#00000088'}
                        size={15}>
                    </Icon>
                </TouchableOpacity>
            </View>);

    }
    render() {
        
        return (
            <View style={{ flex: 1, backgroundColor: colors.COLOR2 }}>
                <CustomHeader backButton={true} otherButton='newHistoric' title={dataInterface.parcialUserName} />

                {this.renderDatePicker()}
                <ScrollView style={{ flex: 1 }}>
                    {
                        dataInterface.userHistoric.filter(item =>
                            item.fecha.includes(this.state.date)).map((item, index) =>
                                this._renderItem(item, index))

                    }
                </ScrollView>

            </View>

        );
    }
}

export default Historic;