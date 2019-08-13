import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import NavigatorService from '../../services/navigatorService';
import colors from '../style/colors'
import firebaseClass from '../../services/firebase';
import dataInterface from '../../dataInterface';
import TimePicker from "react-native-24h-timepicker";
import { observer } from 'mobx-react';
import { toJS } from 'mobx'
import formatDates from '../../dataInterface/formatDates';


MONTHS = ['', 'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']

var datos = []

@observer
class editRegistry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            index: this.props.navigation.state.params.logs,
            modalVisible: false,
            editableId: '',
            editableData: '',
        }

    }

    componentWillMount() {
        console.log('edit registry')
        datos = toJS(dataInterface.userHistoric)
        datos = datos[this.state.index]

    }

    _renderLista(item, index) {

        return (
            <View key={item} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity onPress={() => this._edit(datos.ids[index], true, index)}>
                    <Text style={{ textAlignVertical: 'center', fontSize: responsiveFontSize(4) }}>{formatDates.getHora(item)} - </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this._edit(datos.ids[index], false, index)} >
                    <Text style={{ textAlignVertical: 'center', fontSize: responsiveFontSize(4) }}>{formatDates.getHora(datos.salidas[index])}</Text>
                </TouchableOpacity>

            </View>
        );
    }


    _edit(editableId, editableData, editableIndex) {

        this.TimePicker.open()
        this.setState({
            editableId: editableId,
            editableData: editableData,
            editableIndex: editableIndex,
        })

    }

    _comprobarHora(date) {

        if (this.state.editableData) {
            if (date.getTime() > datos.salidas[this.state.editableIndex])
                return false
            return true
        }
        else {
            if (date.getTime() < datos.entradas[this.state.editableIndex])
                return false
            return true
        }

    }

    onConfirm(hour, minute) {

        var year = datos.fecha.substring(0, 4)
        var month = datos.fecha.substring(5, 7)
        var day = datos.fecha.substring(8, 10)
        var date = new Date(year, month - 1, day, hour, minute, 0)

        if (this._comprobarHora(date)) {
            firebaseClass.editHour(this.state.editableId, this.state.editableData, date.getTime())
            Alert.alert(
                'Registro Actualizado',
                'Se ha actualizado correctamente el registro a ' + date,
                [
                    { text: 'OK', onPress: () => this._goToHistoric() },
                ],
            );
        }
        else {
            Alert.alert(
                'Error',
                'La hora de entrada no puede ser mayor que la hora de salida ',
                [
                    { text: 'OK', onPress: () => this._goToHistoric() },
                ],
            );
        }

        this.setState({ editableId: '' })
        this.setState({ editableData: '' })
        this.TimePicker.close();

    }

    _goToHistoric() {

        return NavigatorService.navigate('Historic');
    }

    onCancel() {

        this.TimePicker.close();
    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.BLUE_STRONG }}>
                    <View style={{ padding: '4%', paddingHorizontal: '7%' }}>
                        <Text style={{ fontSize: responsiveFontSize(3), color: colors.BLUE_LIGHT }}>{datos.fecha.substring(8, 10)}</Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: colors.BLUE_LIGHT }}>{MONTHS[parseInt(datos.fecha.substring(5, 7))]}</Text>
                    </View>
                </View>


                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View>{datos.entradas.map((item, index) => this._renderLista(item, index))}</View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Toca sobre la hora que quieras editar</Text>
                    </View>

                    <View style={{ marginTop: 22 }}>
                        <TimePicker
                            ref={ref => {
                                this.TimePicker = ref;
                            }}
                            onCancel={() => this.onCancel()}
                            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }
}

export default editRegistry;