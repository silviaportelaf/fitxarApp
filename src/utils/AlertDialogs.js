
import {
    Alert,
} from 'react-native'


export function showAlertError(message) {
    Alert.alert(
        'Alert',//hau behintzat traduziru inbierko da , edo kendu, edo error deitxu, 
        message,
        [
            {
                text: 'OK',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
        ],
        { cancelable: false }
    )
}

export function showAlertWithTitle(title, message) {
    Alert.alert(
        title,
        message,
        [
            {
                text: 'OK',
                onPress: () => { },
                style: 'cancel'
            },
        ],
        { cancelable: false }
    )
}