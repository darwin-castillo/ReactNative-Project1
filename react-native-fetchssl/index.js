

/**
 * This exposes the native ToastExample module as a JS module. This has a
 * function 'show' which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be ToastExample.SHORT or
 *    ToastExample.LONG
 */

 'use strict';

import {NativeModules} from 'react-native';
/*
const RNFetchssl = {
    callApi: function (msj) {

    }

    };
*/
module.exports = NativeModules.RNFetchssl;