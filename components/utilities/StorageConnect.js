import React from 'react'
import { AsyncStorage,} from "react-native";

export const StorageConnect = {
    getStorageByKey(key):string {
        this.searchKey(key).then((resp) => {
            // ToastAndroid.show('Token: '+resp,ToastAndroid.SHORT);
            if (resp == null)
              return null;
            else
                return resp;
        });

    },
    searchKey(key):Promise<Response>{

            return( AsyncStorage.getItem(key).then((value)=>{
            return value;
        }));
    }

}
