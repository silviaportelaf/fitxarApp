import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native';
import colors from '../style/colors'

export default class clock extends React.Component
{
    constructor(){
        super();
        this.state = { 
            currentTime: null, 
            currentDay: null,
            vDay: new Date().getDate() ,
            vMonth: null,
            vYear: new Date().getYear() , }
        this.daysArray = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        this.monthsArray = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    }
 
    componentWillMount(){
        this.getCurrentTime();
    }
 
    getCurrentTime = () => {
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        let am_pm = 'pm';
 
        if( minutes < 10 )  minutes = '0' + minutes;
 
        if( seconds < 10 ) seconds = '0' + seconds;

        if( hour > 12 ) hour = hour - 12;
        
        if( hour == 0 ) hour = 12;
               
        if( new Date().getHours() < 12 )
        
            am_pm = 'am';
        
 
        this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm });
 
        this.daysArray.map(( item, key ) =>
        {
            if( key == new Date().getDay() )
            {
                this.setState({ currentDay: item.toUpperCase() });
            }
        }) 
        
        this.monthsArray.map(( item, key ) =>
        {
            if( key == new Date().getMonth() )
            {
                this.setState({ vMonth: item.toUpperCase() });
            }
        })   

    }
 
    componentWillUnmount(){
        clearInterval(this.timer);
    }
 
    componentDidMount(){
        this.timer = setInterval(() =>{this.getCurrentTime();}, 1000);
    }
 
    render()
    {
        return(
            <View style = { styles.container }>
                <View>
                    <Text style = { styles.daysText }>{ this.state.currentDay + ', ' + this.state.vDay + ' de ' + this.state.vMonth  } </Text>
                    <Text style = { styles.timeText }>{ this.state.currentTime }</Text>                    
                </View>
            </View>
        );
    }
}
 
const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BLUE_STRONG,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },
 
    timeText:
    {
        fontWeight: 'bold',
        fontSize: 50,
        color: colors.ORANGE,
        
    },
 
    daysText:
    {
        fontWeight: 'bold',
        color: colors.ORANGE,
        fontSize: 25,
        paddingBottom: 0
    }
});
