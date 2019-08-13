import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
     en: {
         user: 'Username',
         pass: 'Password',

    
    },
    es: {
        user: 'Usuaria',
        pass: 'Contraseña',
        
    },
    eu:{
        user: 'Erabiltzailea',
        pass: 'Pasahitza',
    }
})

export default strings;

