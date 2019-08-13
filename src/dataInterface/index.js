export * from './cloudDataInterface'

import NavigatorService from '../services/navigatorService'
import { observable,action,computed } from 'mobx';



class DataInterface {
  
    @observable _userHistoric=[]
    @observable _userList=[]
    @observable _userID=''
    @observable _userName=''
    @observable _userUid=''
    @observable _userType=''
    @observable _userWorking= '';
    @observable _userImage=''
    @observable _userEmail=''
    @observable _userPhone=''
    @observable _userLocation=''
    
    @observable _parcialUserUID=''
    @observable _parcialUserName=''

    @action setParcialUserUID(value){
        this._parcialUserUID=value;
    }

    @action setParcialUserName(value){
        this._parcialUserName=value;
    }

    @action setUserList(value){
        this._userList=value;
    }
    @action setUserHistoric(value){
        this._userHistoric=value;
    }

    @computed get parcialUserUID()
    {
        return this._parcialUserUID;
    }

    @computed get parcialUserName()
    {
        return this._parcialUserName;
    }
    
    @computed get userHistoric()
    {
        return this._userHistoric;
    }
    @computed get userList()
    {
        return this._userList;
    }


    @computed get userID ()
    {
        return this._userID;
    }

    @computed get userName ()
    {
        return this._userName;
    }
    @computed get userUid ()
    {
        return this._userUid
    }
    @computed  get userType()
    {
        return this._userType;
    }
    @computed get userWorking()
    {
        return this._userWorking;
    }
    @computed get userImage()
    {
        return this._userImage;
    }
    @computed get userEmail()
    {
        return this._userEmail;
    }
    @computed get userPhone()
    {
        return this._userPhone;
    }
    @computed get userLocation()
    {
        return this._userLocation;
    }

  
    
    @action setUserID(value){
        this._userID=value;
    }

    @action setUserName(value){
        this._userName=value;
    }
    @action setUserUid(value){
        this._userUid=value;
    }
    @action setUserType(value){
        this._userType=value;
    }
    @action setUserWorking(value){
        this._userWorking=value;
    }
    @action setUserImage(value){
        this._userImage=value;
    }
    @action setUserEmail(value){
        this._userEmail=value;
    }
    @action setUserLocation(value){
        this._userLocation=value;
    }
    @action setUserPhone(value){
        this._userPhone=value;
    }

 
    format_HistoricCollection(logs)
    {   
        
        
        var aAgrupada=[];
        
        if (logs.length==0)
         return aAgrupada;
        var entradas = [];
        var salidas = [];
        var restas = [];
        var ids=[];
        var totalHoras = 0;
        var fHoy = new Date(logs[0].in).toISOString().split('T')[0]
        var j = 0;
        aMai = logs
        aMai = aMai.reverse();

        for (i = 0; i < logs.length; i++) {
            if (new Date(aMai[i].in).toISOString().split('T')[0] != fHoy) {
                totalHoras = 0;
                entradas = [];
                salidas = [];
                restas = [];
                ids=[];
                fHoy = new Date(aMai[i].in).toISOString().split('T')[0];
                j++;
            }

            entradas.push(aMai[i].in)
            salidas.push(aMai[i].out)
            ids.push(aMai[i].id)
            if (aMai[i].out != "") {
                restas.push(aMai[i].out - aMai[i].in)
                totalHoras = totalHoras + (aMai[i].out - aMai[i].in)
            }
            else restas.push("")

            aAgrupada[j] = { fecha: fHoy, entradas: entradas, salidas: salidas, restas: restas, totalHoras: totalHoras,ids:ids }

        }
        console.log('aAgrupada')
        console.log(aAgrupada)
        
        return aAgrupada;
    }

    setUserOnDataInterface(doc) {
      
        this.setUserID(doc.id)
        this.setUserName(doc.data().name);
        this.setUserUid(doc.data().uid);
        this.setParcialUserUID(doc.data().uid);
        this.setParcialUserName(doc.data().name);
        this.setUserWorking(doc.data().working);
        this.setUserType(doc.data().type);
        this.setUserImage(doc.data().image);
        this.setUserEmail(doc.data().email);
        this.setUserLocation(doc.data().location);
        this.setUserPhone(doc.data().phone);
        

  
        
     }


DetectOrientation(){

    if(this.state.Width_Layout > this.state.Height_Layout)
    {

      // Write Your own code here, which you want to execute on Landscape Mode.

        this.setState({
        OrientationStatus : 'Landscape Mode'
        });
    }
    else{

      // Write Your own code here, which you want to execute on Portrait Mode.

        this.setState({
        OrientationStatus : 'Portrait Mode'
        });
    }

  }



    // _getHora(gaur) {

    //     if (gaur == "") return null

    //     var date = new Date(gaur);
    //     var hh = date.getHours();
    //     var mm = date.getMinutes();
    //     var ss = date.getSeconds();

    //     return ' ' + (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    // }


   
}
let dataInterface = new DataInterface()
export default dataInterface;