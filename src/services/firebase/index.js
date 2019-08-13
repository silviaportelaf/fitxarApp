import firebase from 'react-native-firebase'
import dataInterface from '../../dataInterface'
import { observable, computed, action, toJS } from 'mobx'
import { Alert } from 'react-native'
import { removeUser } from '../../utils/AsyncStorage'
import NavigatorService from '../../services/navigatorService'

class FirebaseClass {

    getUser(value) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('Users').where("uid", "==", value).get().then((doc) => {
                console.log("id-->" + doc)
                if (doc.docs.length > 0) {
                    resolve(doc.docs[0]);
                }
            }).catch((error) => {
                resolve(error)
            })
        })
    }

    login(user, pass) {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(user, pass).then((response) => {
                firebase.firestore().collection('Users').where("uid", "==", response.user.uid).get().then((doc) => {
                    console.log("id-->" + doc.docs[0].id)

                    if (doc.docs.length > 0) {
                        resolve(doc.docs[0])
                    } else {
                        reject(null);
                    }

                }).catch((error) => { reject(error) })
            }).catch((error) => { reject(error) });
        })
    }

    logOut() {
        firebase.auth().signOut().then(function () {
            console.log('Log out OK')
            removeUser().then(() => NavigatorService.navigate('Auth'));
        }).catch(function (error) {
            console.log('Log out ERROR')
        });
    }

    registryIn(uid) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection("Historics").add({
                uid: uid,
                in: Date.now(),
                out: '',
            }).catch(err => console.error('registryIn error: ', err));
        })

    }

    registryOut(uid) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection("Historics").where("uid", "==", uid).where("out", "=", "").limit(1).get()
                .then((doc) => {
                    firebase.firestore().collection("Historics").doc(doc.docs[0].id).update({ out: Date.now() })
                        .catch(err => console.error('registryOut error: ', err));
                }).catch(err => console.error('registryOut error: ', err));
        })
    }

    updateWorking(id, working) {
        firebase.firestore().collection("Users").doc(id).update({ working: !working, })

    }

    registryInOut(uid, dateIn, dateOut) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection("Historics").add({
                uid: uid,
                in: dateIn,
                out: dateOut,
            }).catch(err => console.error('registryInOut error: ', err));
        })

    }


    getUsersCollection() {


        return new Promise((resolve, reject) => {
            firebase.firestore().collection("Users").onSnapshot(querySnapshot => {
                console.log('CAMBIOOOOO users')
                var users = [];
                querySnapshot.forEach(function (doc) {
                    users.push(doc.data())
                });
                dataInterface.setUserList(users)
                resolve(true)
            })
        })
    }



    newUser(email, name, password) {

        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log('res',res)
                    firebase.firestore().collection("Users").add({
                        name: name,
                        email: email,
                        uid: res.user.uid,
                        image: "https://www.uic.mx/posgrados/files/2018/05/default-user.png"
                    })
                    firebase.auth().signInWithEmailAndPassword("a@a.es", "123124")
                    resolve(true)
                }).catch((error) =>reject(error))
        });

    }

    getHistoricCollection(uid) {
        var fecha = 0;

        return new Promise((resolve, reject) => {
            firebase.firestore().collection("Historics").where("uid", "==", uid).onSnapshot(querySnapshot => {
                console.log('CAMBIOOOOO')
                var historicos = []
                querySnapshot.docs.forEach((doc) => {
                    if (doc.data().in > fecha) {
                        fecha = doc.data().in
                    }
                    historicos.push({
                        uid: doc.data().uid,
                        in: doc.data().in,
                        out: doc.data().out,
                        id: doc.id,
                    })

                });
                historicos.sort(function (a, b) {
                    return (a.in - b.in)
                })

                let array = dataInterface.format_HistoricCollection(historicos)
                array.shift()
                dataInterface.setUserHistoric(toJS(array))
                resolve(true)

            })
        }
        )
    }

    // return new Promise((resolve, reject) => {
    //     firebase.firestore().collection("Historics").where("uid", "==", uid).get().then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {
    //             if (doc.data().in > fecha) {
    //                 fecha = doc.data().in
    //             }
    //             historic.push({
    //                 uid: doc.data().uid,
    //                 in: doc.data().in,
    //                 out: doc.data().out,
    //                 id: doc.id,
    //             })
    //         });
    //         historic.sort(function (a, b) {
    //             return (a.in - b.in)
    //         })
    //         let array = dataInterface.format_HistoricCollection(historic)
    //         array.shift()

    //         dataInterface.setUserHistoric(toJS(array))
    //         console.log(this._userHistoric)
    //         resolve(true)
    //     }).catch(err => console.error('registryOut error: ', err))
    // })
    // }

    editHour(idEdit, inOrOut, date) {

        return new Promise((resolve, reject) => {
            if (inOrOut)
                firebase.firestore().collection("Historics").doc(idEdit).update({ in: date, })
                    .catch(
                        err => console.error('editHour error: ', err)
                    );
            else
                firebase.firestore().collection("Historics").doc(idEdit).update({ out: date, })
                    .catch(
                        err => console.error('editHour error: ', err)
                    );

        })

    }

    editProfile(userName, userLocation, userPhone, userEmail) {
        console.log(dataInterface.userID)

        firebase.firestore().collection("Users").doc(dataInterface.userID).update({
            name: userName,
            email: userEmail,
            location: userLocation,
            phone: userPhone
        })
            .catch(
                err => console.error('editProfile error: ', err)
            );
    }

    changeEmail(nEmail, oEmail, pass) {
        firebase.auth()
            .signInWithEmailAndPassword(oEmail, pass)
            .then(function (userCredential) {

                console.log(userCredential)
                userCredential.user.updateEmail(nEmail).then(function () {
                    Alert.alert(
                        'Email Actualizado',
                        'Se ha actualizado correctamente el email',
                    );
                }).catch(function (error) {
                    // An error happened.
                    Alert.alert('Error', 'Vuelva a intentarlo')
                });

            })
    }





}
let firebaseClass = new FirebaseClass()
export default firebaseClass 