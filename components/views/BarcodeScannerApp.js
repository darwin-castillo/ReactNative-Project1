import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Vibration,
    View,
    TouchableHighlight,
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import * as ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid.android";

export class BarcodeScannerApp extends Component {
 producto="";
 th
 back=false;
    constructor(props) {
        super(props);
        let prod="";

        this.state = {
            barcode: '',
            cameraType: 'back',
            text: 'Scan Barcode',
            torchMode: 'off',
            type: '',
            nave:'',

        };

        if(this.props.navigation.state.params)
        {
            if(this.props.navigation.state.params.producto){
                prod=this.props.navigation.state.params.producto;
            }
            if(this.props.navigation.state.params.entrega){
                let bck = this.props.navigation.state.params.entrega;
                if(bck === '1'){
                   this.back=true;
                }
            }
        }
        this.producto=""+prod;
    }
    barcodeReceived(e) {
        if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();

        JSON.parse(e.data, (key, value) => {
            if (typeof value === 'string') {
                return value.toUpperCase();
            }
            return value;
        });
        this.producto=this.producto+","+e.data;
        this.setState({
            barcode: e.data,
            text: `${e.data} (${e.type})`,
            type: e.type,


        });
        this.props.navigation.navigate('BuyProduct',{producto:this.producto, back:this.back, data: e.data });
    }

    render() {

        return (

            <View style={styles.container}>
                <BarcodeScanner
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    style={{ flex: 1 }}
                    torchMode={this.state.torchMode}
                    cameraType={this.state.cameraType}
                />
                <View style={styles.statusBar}>
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={() => { this.props.navigation.navigate('BuyProduct',{nave:this.props.navigation.state.params.nave,producto:this.producto+",1",back:this.back,/*data:"105"*/}) }}
                        underlayColor='#fff'>
                    <Text style={styles.statusBarText}>{'Escanear Codigo de '+this.props.navigation.state.params.nave}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarText: {
        fontSize: 20,
    },
});
