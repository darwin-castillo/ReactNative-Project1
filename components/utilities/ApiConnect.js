import {Component} from 'react'
import {Alert, AsyncStorage,ToastAndroid} from "react-native";
import {Utils} from "./Utils";
import {StorageConnect} from "./StorageConnect";


export var heads = {

         Accept: 'application/json',
        'Content-Type': 'application/json',
         'Cache-Control':'no-cache',
         Authorization: "",


}
export  var apiUrl = "https://club.zippyttech.com:8080/api/";

export var Bearer ="";
const ApiConnect = {

     getStorageByKey(key){
        this.searchKey(key).then((resp) => {
            // ToastAndroid.show('Token: '+resp,ToastAndroid.SHORT);
            if (resp !== null) {
                Bearer = "Bearer " + resp;

            }

        });

    },
    searchKey(key):Promise<Response>{

        return( AsyncStorage.getItem(key).then((value)=>{
            return value;
        }));
    },


     RequestApi(method:string, endpoint:string, payload:any ):Promise<Response>{
         this.getStorageByKey('access_token');

       return(
           this.searchKey('access_token').then((resp) => {
               // ToastAndroid.show('Token: '+resp,ToastAndroid.SHORT);
               Bearer = "Bearer "+resp;
                return this.FetchingData(method, endpoint, payload)
           } )

       ); // end RETURN



    },

    FetchingData(method:string, endpoint:string, payload:any):Promise<Response>{
         ToastAndroid.show("Si es ? "+Bearer,ToastAndroid.SHORT);
      return  fetch(apiUrl+endpoint, {
            method:method,
            headers: {  Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control':'no-cache',
                Authorization: Bearer},
            body:payload,

        }).then((response) => {
            return response;
        }).
        catch((reason) => {
            console.log('There has been a problem with your fetch operation: ' + reason.message);
            // ADD THIS THROW error
            throw reason;
        })
    },

}


export default ApiConnect;