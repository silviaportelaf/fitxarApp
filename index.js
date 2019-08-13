/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import navigation from './src/navigation/navigation';

AppRegistry.registerComponent(appName, () => navigation);

