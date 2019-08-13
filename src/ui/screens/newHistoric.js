import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
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

class newHistoric extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            pass: '',
            date:'',
            dateIn: '',
            dateOut: '',
        };

    }


    renderDate() {
        return (<DatePicker
            style={{ width: 200 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            minDate="2019-01-01"
            maxDate={date}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
            }}
            onDateChange={(date) => { this.setState({ date })} }
        />)
    }

    renderDatePicker(value) {
        return (<DatePicker
            style={{ width: 200 }}
            date={value=="in" ? this.state.dateIn : this.state.dateOut}
            mode="datetime"
            placeholder={value=="in" ? "Select entry Hour" : "Select exit Hour"}
            minDate="2019-01-01"
            maxDate={date}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
            }}
            onDateChange={value=="in" ? (dateIn) => { this.setState({ dateIn })} :(dateOut) => { this.setState({ dateOut })}  }
        />)
    }

    
    _onPressButton(){

        var dateIn = new Date (this.state.dateIn)
        var dateOut = new Date (this.state.dateOut)

        if (formatDates.comprobar(dateIn,dateOut))
        {
            dateIn=dateIn.getTime()
            dateOut=dateOut.getTime()
            firebaseClass.registryInOut(dataInterface.parcialUserUID,dateIn,dateOut)
            Alert.alert("Registro añadido correctamente")
            NavigatorService.back()
        }else{
            Alert.alert("Fechas mal introducidas. Recuerda que tienen que tener sentido.")
        }
    
    }

    render() {
        return (

            <View style={{ flex: 1, backgroundColor: colors.BLUE_LIGHT, }}>
                {/* <CustomHeader backButton={true} title={'Nuevo Registro'} /> */}
            
                    <View style={{ flex: 1, alignItems:'center',justifyContent:'flex-end'}}>
                        {this.renderDatePicker('in')}
                    </View>
                    <View  style={{ flex: 1, alignItems:'center',justifyContent:'center'}}>
                        {this.renderDatePicker('out')}
                    </View>
                
                <View style={{ flex: 1}}>
             
                    <Text onPress={() => this._onPressButton()}
                        style={{ color: '#00F', textAlign: 'center' }}>
                        Nuevo Registro
                    </Text>
                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create(
    {
        textInput:
        {
            borderWidth: 2, borderColor: colors.BLUE_STRONG, margin: 20
        },
    });

export default newHistoric;