import config from './config'
import { parseRegistration, parseAddMailing } from './parsers'
import { fetch_POST, fetch_POST_auth, fetch_GET_auth, } from './utils'
import { unParseLogListResponse, parseUpdateTokenBox, parseInsertBox, parseUnlinkBox, unParseBoxListResponse, unParseLogHistoryListResponse, } from './parsers'
import { AsyncStorage } from "react-native"

class Platform {

    constructor() {
        this.host = config.hosts.dev;
        this.authToken = '';
    }

    _storeUserToken = async (token, callback) => {
        try {
            console.log("asyncStorage token: ", token);
            if (callback)
                return await AsyncStorage.setItem('user_token', token, callback);
            else {
                return await AsyncStorage.setItem('user_token', token);
            }
        } catch (error) {
            // Error saving data
        }
    }
    getUserToken = async () => {
        if (this.authToken) {
            return this.authToken;
        } else {
            try {
                const value = await AsyncStorage.getItem('user_token');
                if (value !== null) {
                    this.authToken = value;
                    return this.authToken;
                }
            } catch (error) {
                // Error retrieving data
            }
        }
    }

    resetUserToken = async () => {
        this.authToken = null;
        return await AsyncStorage.removeItem('user_token');

    }

    login(user, password) {
        return fetch_POST(
            `${this.host}${config.endpoints.login}`,
            {
                user: user,
                password: password
            }).then(response => {
                if (!response._bodyText.includes(' ')) {
                    return this._storeUserToken(response._bodyText).then(re => {
                        console.log("Logineko erantzuna: ", response._bodyText);
                        this.authToken = response._bodyText;
                        return 'LOGIN_OK';
                    });
                } else {
                    return response._bodyText;
                }
            });
    }

    signUp(firstName, lastName, iscompany, email, password) {
        return fetch_POST(`${this.host}${config.endpoints.signUp}`,
            parseRegistration(firstName, lastName, iscompany, email, password)
        ).then((response) => {
            return response
        });
    }


    getLogs() {
        return this.getUserToken().then((response) => {
            return fetch(`${this.host}${config.endpoints.logList}`, {
                method: 'GET',
                headers: this.apiHeader(response)
            }).then((response) => {
                return response.status === 200 ? unParseLogListResponse(response) : response._bodyText;
            });
        })
    }


    getLogsFromBox(boxId) {
        return this.getUserToken().then((response) => {
            return fetch_GET_auth(`${this.host}${config.endpoints.logList}/?box_id=${boxId}`, response).then((response) => {
                return response.status === 200 ? unParseLogListResponse(response) : response._bodyText;
            });
        })
    }

    getLogHistoryFromBox(boxId) {
        return this.getUserToken().then((response) => {
            return fetch_GET_auth(`${this.host}${config.endpoints.boxHistoryList}/?box_id=${boxId}`, response).then((response) => {
                return response.status === 200 ? unParseLogHistoryListResponse(response) : response._bodyText;
            });
        })
    }

    getBoxWithSerialNumber(serialNumber) {
        return this.getUserToken().then((response) => {
            return fetch(`${this.host}${config.endpoints.listBoxes}/?serial_number='${serialNumber}'`, {
                method: 'GET',
                headers: this.apiHeader(response)
            }).then((response) => {
                boxInArray = JSON.parse(response._bodyText).values
                //boxInArray = unParseBoxListResponse(response);
                //console.log(boxInArray[0])
                return boxInArray[0];
            });
        })
    }

    getBoxes() {
        return this.getUserToken().then((response) => {
            return fetch_GET_auth(`${this.host}${config.endpoints.listBoxes}`, response).then((response) => {
                console.log(response)
                return response.status === 200 ? unParseBoxListResponse(response) : response._bodyText;
            }).catch((error) =>
                console.log(error));
        });
    }

    updateTokenBox(serial_number) {
        return fetch_POST_auth(`${this.host}${config.endpoints.updateTokenBox}`,
            parseUpdateTokenBox(serial_number), this.authToken).then((response) => {
                return response._bodyText;
            }).catch((error) => {
                alert(error.message);
            });;
    }

    insertBox(serial_number, box_name) {
        return this.getUserToken().then((response) => {
            return fetch_POST_auth(`${this.host}${config.endpoints.insertBox}`, parseInsertBox(serial_number, box_name), response)
                .then((resp) => {
                    console.log(resp);
                    return this.updateTokenBox(serial_number).then((respons) => {
                        return respons;
                    });
                }).catch((error) => {
                    alert(error.message);
                });;
        })
    }

    unlinkBox(serial) {
        return fetch_POST_auth(`${this.host}${config.endpoints.unlinkBox}`,
            parseUnlinkBox(serial),
            this.authToken)
            .then((response) => {
                return response
            }).catch((error) => {
                alert(error.message);
            });
    }

    checkBoxSerial(serial) {
        return this.getUserToken().then((token) => {
            return fetch(`${this.host}${config.endpoints.checkBoxSerial}/${serial}`, {
                method: 'GET',
                headers: this.apiHeaderNotAccept(token)
            }).then((response) => {
                console.log(response);
                return response._bodyText
            }).catch((error) => {
                alert('Log IN  to acces to the cloud platform');
                return error;
            });
        })
    }
    addMailingAccount(serial, email) {
        return fetch_POST_auth(`${this.host}${config.endpoints.addBoxMailing}`,
            parseAddMailing(serial, email),
            this.authToken
        ).then((response) => {
            console.log('Add mailing account erantzuna:' + response._bodyText);

            return response._bodyText
        });

    }
    removeMailingAccount(serial, email) {
        return fetch_POST_auth(`${this.host}${config.endpoints.removeBoxMailing}`,
            parseAddMailing(serial, email),
            this.authToken
        ).then((response) => {
            console.log('Remove mailing account erantzuna:' + response._bodyText);

            return response._bodyText
        });

    }

    checkLastFirmwareVersionForBoxModel(model) {
        return this.getUserToken().then((token) => {
            return fetch(`${this.host}${config.endpoints.versionCheck}/${model}`, {
                method: 'GET',
                headers: this.apiHeaderNotAccept(token)
            }).then((response) => {
                console.log('Azken firmware:' + response._bodyText);
                return response._bodyText
            }).catch((error) => {
                alert('Log IN  to acces to the cloud platform');
                return error;
            });
        })
    }


    apiHeader = (authToken) => {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        };
    }


    apiHeaderNotAccept = (authToken) => {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        };
    }


}

let platform = new Platform()
export default platform;