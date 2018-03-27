import {Component} from 'react'
import {Alert, AsyncStorage, NativeModules, Promise as reject, Promise as resolve, ToastAndroid} from "react-native";
import {Utils} from "./Utils";
import {StorageConnect} from "./StorageConnect";


export var apiUrl = "https://club.zippyttech.com:8080/api/";
const RNFetchssl = NativeModules.RNFetchssl;
let Response = "";
export var Bearer = "";

export const ApiConnect = {

    getStorageByKey(key) {
        this.searchKey(key).then((resp) => {

            if (resp !== null) {
                Bearer = "Bearer " + resp;

            }

        });

    },
    searchKey(key): Promise<Response> {

        return (AsyncStorage.getItem(key).then((value) => {
            return value;
        }));
    },

    RequestApi(method: string, endpoint: string, payload: any): Promise<Response> {
        this.getStorageByKey('access_token');
        endpoint = apiUrl + endpoint;
        method = method.toLowerCase();


        return (
            this.searchKey('access_token').then((resp) => {
                let heads = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                };
                   if(resp!=null && !('Authorization' in heads)) {
                       heads.Authorization = "Bearer " + resp;
                       ToastAndroid.show("pasa por bearer "+heads.Authorization,ToastAndroid.SHORT);
                   }
                    if (method === 'post')
                        return NativeModules.RNFetchssl.post(endpoint,
                            payload, heads);
                    else if (method === 'get')
                        return NativeModules.RNFetchssl.get(endpoint, heads);
                    else if (method === 'put')
                        return NativeModules.RNFetchssl.put(endpoint,
                            payload, heads);
                    else if (method === 'delete')
                        return NativeModules.RNFetchssl.delete(endpoint, heads);
                }
            )); // end RETURN
    },

    PromisePrueba(): Promise<any> {
        let isMomHappy = true;
// Promise
        let willIGetNewPhone = new Promise(
            function (resolve, reject) {
                if (isMomHappy) {
                    let phone = {
                        modelo: 'Samsung',
                        color: 'black'
                    };
                    resolve(phone); // fulfilled
                } else {
                    var reason = new Error('mom is not happy');
                    reject(reason); // reject
                }

            }
        );
        return willIGetNewPhone;
    },

    FetchingData(method: string, endpoint: string, payload: any): Promise<Response> {
        return fetch(apiUrl + endpoint, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                Authorization: Bearer
            },
            body: payload,

        }).then((response) => {
            return response;
        }).catch((reason) => {
            console.log('There has been a problem with your fetch operation: ' + reason.message);
            // ADD THIS THROW error
            throw reason;
        })
    },

}


export default ApiConnect;