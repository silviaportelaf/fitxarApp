export * from './cloudDataInterface'

class FormatDates {

    getResta(gaur) {

        var sec = gaur / 1000;
        var hh = Math.floor(sec / 3600);
        var mm = Math.floor((sec - (hh * 3600)) / 60);
        var ss = Math.floor(sec - (hh * 3600) - (mm * 60));

        return '' + (hh < 10 ? '0' + hh : hh) + 'h ' + (mm < 10 ? '0' + mm : mm) + 'm ' + (ss < 10 ? '0' + ss : ss) + 's';

    }

    getHora(gaur) {

        if (gaur == "") return null

        var date = new Date(gaur);
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();

        return ' ' + (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    }

    getFecha(gaur) {
       
        
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
     
            var time = date + ' ' + month + ' ' + year  ;
            return time;
       
    }

    comprobar(dateIn,dateOut)
    {
        var mismoDia=false;

        if (dateIn.getDate()==dateOut.getDate() && dateIn.getMonth()==dateOut.getMonth() && dateIn.getFullYear()==dateOut.getFullYear())
            mismoDia=true;

        if(dateIn<dateOut && mismoDia)
            return true;
        return false
    }




}
let formatDates = new FormatDates()
export default formatDates;