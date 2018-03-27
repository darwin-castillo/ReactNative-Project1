import React, {Component} from 'react';
import {
    Alert,
    ListView,
    View,
    Text,
    TextInput,
    Modal,
    Button,
    ToastAndroid,
    ImageBackground,
    Image,
    AsyncStorage,
    Switch,
    TouchableHighlight,
    NativeModules,
    StyleSheet
} from "react-native";

const RNFetch = NativeModules.RNFetchssl;

import pinch from 'react-native-pinch';
import PopoverTooltip from 'react-native-popover-tooltip';
import {MainView} from "./LoginView";
import {RootStack, App} from "../../App"
import Spinner from 'react-native-loading-spinner-overlay';

//import {ApiConnect, apiUrl, POSTRequest} from "../utilities/ApiConnect";
import ApiConnect, {apiUrl, Bearer} from "../utilities/ApiConnect";

const colorThemeApp = "#114512";
const RNFetchssl = NativeModules.RNFetchssl;
export var heads = {

    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: "",


};


/*
var XMLHttpRequest = require("xmlhttprequest-ssl").XMLHttpRequest;
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    console.log("State: " + this.readyState);

    if (this.readyState === 4) {
        console.log("Complete.\nBody length: " + this.responseText.length);
        console.log("Body:\n" + this.responseText);
        ToastAndroid.show("Body:\n" + this.responseText,ToastAndroid.SHORT);
    }
};
*/
export class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: 'darwin.c5@gmail.com',
            password: '',
            modalVisible: false,
            isLoading: true,
            mesg: 'nada',
            spinnerVisible: false,
            inputs: {
                user: '',
                password: '',
            },
            tooltip_msg_pass: '',
            tooltip_msg_usr: '',
            focus_pass: false,
            focus_usr: false,
            spinnerMessage: '',
            overlayDialogColor: '', // color font to dialogs

            userName: '',
        };

    }

    greetingUserCallback = () => {
        const state = this.state;
        RNFetchssl.callApi(state.userName, state.isAdmin, this.displayResult)
        // RNFetchssl.fetch('POST','https://club.zippyttech.com:8080/api/login','{"username":"darwin.c5@gmail.com","password":"123456"}',{Accept:"application/json"},this.displayResult);
    };
    displayResult = (result) => {
        //   this.refs.userName.blur();
        // this.setState({greetingMessage: result});
        this.AlertMesg('Mensaje API', result);
    }

    componentDidMount() {

        this.setState({
            greetingMessage: undefined
        });
    }

    render() {
        return (
            <ImageBackground resizeMode='cover' style={styles.container} source={require('./app_movil.png')}
            >

                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >

                    <View style={styles.modalText}>
                        <View style={styles.modalText}>
                            <Text>{this.state.mesg}</Text>
                            <Button
                                onPress={() => this.closeModal()}
                                title="Close modal">
                            </Button>
                        </View>
                    </View>
                </Modal>

                <Spinner
                    visible={this.state.spinnerVisible}
                    textContent={this.state.spinnerMessage}
                    textStyle={{color: '#FFF'}}
                    animation="fade"
                    //  overlayColor="#114512"
                />

                <PopoverTooltip
                    ref='tooltip_usr'
                    buttonComponent={
                        <TextInput
                            style={[styles.logginInputs,
                                {
                                    height: 40,
                                    borderWidth: 0,
                                    alignSelf: 'stretch',
                                    color: 'white',

                                }]}
                            placeholderTextColor="white"
                            onChangeText={(user) => this.setState({user})}
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordTextInput.focus()}
                            /* const user = Object.assign({}, this.state.inputs, {user: username });
                             this.setState({ user });*/
                            underlineColorAndroid="white"
                            value={this.state.user}
                            placeholder={'Usuario'}
                            ref={(input) => this.userTextInput = input}
                        />

                    }

                    items={[
                        {
                            label: this.state.tooltip_msg_usr,
                            onPress: () => {
                            }
                        }

                    ]}
                    // animationType='timing'
                    // using the default timing animation
                />

                <PopoverTooltip
                    ref='tooltip_pass'
                    buttonComponent={
                        <TextInput
                            style={[styles.logginInputs,
                                {
                                    height: 40,
                                    borderWidth: 0,
                                    alignSelf: 'stretch',
                                    color: 'white',
                                }]}
                            placeholderTextColor="white"
                            onChangeText={(password) => this.setState({password})}
                            placeholder={'Contraseña'}
                            value={this.state.password}
                            secureTextEntry={true}
                            returnKeyType="send"
                            onSubmitEditing={this.Login.bind(this)}
                            ref={(input) => this.passwordTextInput = input}
                        />

                    }

                    items={[
                        {
                            label: this.state.tooltip_msg_pass,
                            onPress: () => {
                            }
                        }

                    ]}
                    // animationType='timing'
                    // using the default timing animation
                />
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => this.Login() /*this.AlternativeLogin()*/}
                    underlayColor='#fff'>
                    <Text style={[styles.submitText]}>INGRESAR</Text>
                </TouchableHighlight>

            </ImageBackground>
        );

    }

    /*
        componentDidMount() {
    //todo: build Native Module
      <View>
                <TextInput
                 ref="userName"
                 autoCorrect={false}
                 style={styles.logginInputs}
                 placeholder="User Name"
                 onChangeText={(text)=>this.setState({userName: text})}
                />
               <TouchableHighlight
               onPress={this.greetUserCallback}
               >

                   <Text>boton</Text>
               </TouchableHighlight>
             </View>

    //todo: end native module




























            return fetch('https://facebook.github.io/react-native/movies.json')
                .then((response) => response.json())
                .then((responseJson) => {
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        isLoading: false,
                        dataSource: ds.cloneWithRows(responseJson.movies),
                    }, function () {
                        // do something with new state
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    */
    closeModal() {
        this.setState({modalVisible: false});
    }

    AlertMesg(title: string, message: string,) {
        Alert.alert(
            title,
            message,
            [
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        );
    }

    validateInputs(): boolean {
        var ms_pass = '';
        var ms_usr = '';
        if (this.state.password == null || this.state.password == '') {
            ms_pass = 'Debe ingresar la contraseña para iniciar sesion';
            this.setState({tooltip_msg_pass: ms_pass});
            this.refs['tooltip_pass'].toggle();
            if (this.passwordTextInput != null)
                this.passwordTextInput.focus();

            return false;
        }
        else if (this.state.password.length < 6) {
            ms_pass = 'La contraseña debe ser mayor a 6 caracteres';
            this.setState({tooltip_msg_pass: ms_pass});
            this.refs['tooltip_pass'].toggle();
            if (this.passwordTextInput != null)
                this.passwordTextInput.focus();
            return false;
        }
        else if (this.state.user == null || this.state.user == '') {
            ms_usr = 'Debe ingresar el usuario para iniciar sesion';
            this.setState({tooltip_msg_usr: ms_usr});
            this.refs['tooltip_usr'].toggle();
            if (this.userTextInput != null)
                this.userTextInput.focus();
            return false;
        }

        return true;

    }

    /*
        POSTRequest( endpoint, payload ):Promise<Response>{

            return ( fetch(apiUrl+endpoint, {
                method: 'POST',
                headers: heads,
                body:payload,
                /* body: JSON.stringify({
                     username: 'darwin.c5@gmail.com',
                     password: '123456'

                 })
            }).then((response) => response.json())
                /*  .then((responseJson) => {
                      this.setState({modalVisible: true,mesg:JSON.stringify(responseJson)});
                  })
                  .catch((error) => {
                      this.setState({modalVisible: true, mesg: JSON.stringify(error)});
                      //console.error(error);
                  }));
            //  this.refs.toast.show('hello world!');



        }

    */

    goToMainView() {
        this.props.navigation.navigate('Main');
    }

    GetDataUser() {
        this.setState({spinnerMessage: 'Obteniendo Data de Usuario...',});
        ApiConnect.RequestApi('GET', 'current/user', '')
            .then((responseJson) => {
                this.setState({spinnerMessage: '', spinnerVisible: false});
                let responseObj = JSON.parse(responseJson);
                this.setState({spinnerVisible: false});
                if (!('error' in responseObj)) {
                    if ('contractCode' in responseObj) {
                        this.setState({spinnerMessage: responseObj.contractCode,});
                        AsyncStorage.setItem('contractCode', responseObj.contractCode);
                    }
                    if ('image' in responseObj) {
                        AsyncStorage.setItem('image', responseObj.image);
                    }
                    if ('email' in responseObj) {
                        this.setState({spinnerMessage: responseObj.email,});
                        AsyncStorage.setItem('email', responseObj.email);
                    }
                    if ('userStatusTitle' in responseObj) {
                        AsyncStorage.setItem('userStatusTitle', responseObj.userStatusTitle);
                    }
                    if ('name' in responseObj) {
                        this.setState({spinnerMessage: responseObj.name,});
                        AsyncStorage.setItem('name', responseObj.name);
                    }
                    if ('phone' in responseObj) {
                        AsyncStorage.setItem('phone', responseObj.phone);
                    }
                }
                this.goToMainView();
            });


    }

    GetDataQR() {
        this.setState({spinnerMessage: 'Obteniendo Información Adicional...',});
        ApiConnect.RequestApi('GET', 'current/qr', null)
            .then((responseJson) => {
                this.setState({spinnerMessage: '', spinnerVisible: true});
                if (responseJson.ok) {
                    responseJson.json().then((rsp) => {
                        AsyncStorage.setItem('contractCode', rsp.contractCode);
                        AsyncStorage.setItem('image', rsp.image);
                        AsyncStorage.setItem('email', rsp.email);
                        AsyncStorage.setItem('userStatusTitle', rsp.userStatusTitle);
                        AsyncStorage.setItem('contractCode', rsp.contractCode);
                        AsyncStorage.setItem('name', rsp.name);
                        AsyncStorage.setItem('phone', rsp.phone);
                        this.goToMainView();
                    })

                }
                else {
                    this.AlertMesg("ERROR", "Error interno: ");
                }

            })

    }

    funcionprueba = (respuesta) => {
        ToastAndroid.show("respuestaaa: " + respuesta, ToastAndroid.SHORT);
    };

    AlternativeLogin() {
        //    if (this.validateInputs()) {

        ToastAndroid.show("Intentando REq", ToastAndroid.SHORT);
        ApiConnect.RequestApi('', '', '').then((res) => {
            ToastAndroid.show("Paso " + res, ToastAndroid.SHORT);
        }).catch(reason => {
            ToastAndroid.show("No Paso " + JSON.stringify(reason), ToastAndroid.SHORT);
        });
        //ApiConnect.RequestApi("POST","login",'{"username":"darwin.c5@gmail.com","password":"123456"}',this.funcionprueba);


        /*
        ApiConnect.PromisePrueba().then((res) => {
   ToastAndroid.show("Paso "+ res.modelo,ToastAndroid.SHORT);
}).catch(reason => {
  ToastAndroid.show("No Paso "+JSON.stringify(reason),ToastAndroid.SHORT);
})


        fetch("https://club.zippyttech.com:8080", {

            method:'GET',
            headers: {  Accept: 'application/json',
                       'Content-Type': 'application/json',
                       'Cache-Control':'no-cache',

                // club Authorization: 'Bearer rgn2iheirhdr38f4kr5a882p3gej5qf8'
                // vertedero Authorization:'Bearer usk14fppc6qi871pnoikfj3t0al8ggfo'
                //  Authorization: 'Bearer rgn2iheirhdr38f4kr5a882p3gej5qf8',

            },
            body:'{"username":"darwin.c5@gmail.com","password":"123456"}',

        }).then((response) => {
            this.setState({ spinnerVisible:false,});
            //  ToastAndroid.show("Hola: "+JSON.stringify(response),ToastAndroid.SHORT);
            this.AlertMesg('Mensaje de api',JSON.stringify(response));
            return response;
        }).
        catch((reason) => {
            console.log('There has been a problem with your fetch operation: ' + reason.message);
            // ADD THIS THROW error
            throw reason;
        })
       // xhr.open("GET", "https://club.zippyttech.com:8080");

       // xhr.send();
       /* pinch.fetch('https://club.zippyttech.com:8080/api/login', {
            method: 'POST',
            headers: { Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control':'no-cache' },
            body: '{"username":"darwin.c5@gmail.com","password":"123456"}',
            timeoutInterval: 10000, // timeout after 10 seconds
            sslPinning: {} // omit the `cert` or `certs` key, `sslPinning` can be ommited as well
        }).then((response) => {
            this.setState({ spinnerVisible:false,});
            //  ToastAndroid.show("Hola: "+JSON.stringify(response),ToastAndroid.SHORT);
            this.AlertMesg('Mensaje de api',JSON.stringify(response));
            return response;
        }).
        catch((reason) => {
            console.log('There has been a problem with your fetch operation: ' + reason.message);
            // ADD THIS THROW error
            throw reason;
        })

           //https://club.zippyttech.com:8080/api/
        // http://vertedero.aguaseo.com:8080/api/   https://vertedero.aguaseo.com:8080/api/users
/*
            fetch("https://club.zippyttech.com:8080/api/login", {
                method:'POST',
                headers: {  Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Cache-Control':'no-cache',
                   // club Authorization: 'Bearer rgn2iheirhdr38f4kr5a882p3gej5qf8'
                    // vertedero Authorization:'Bearer usk14fppc6qi871pnoikfj3t0al8ggfo'
                  //  Authorization: 'Bearer rgn2iheirhdr38f4kr5a882p3gej5qf8',

                    },
                body:'{"username":"darwin.c5@gmail.com","password":"123456"}',

            }).then((response) => {
                this.setState({ spinnerVisible:false,});
              //  ToastAndroid.show("Hola: "+JSON.stringify(response),ToastAndroid.SHORT);
                this.AlertMesg('Mensaje de api',JSON.stringify(response));
                return response;
            }).
            catch((reason) => {
                console.log('There has been a problem with your fetch operation: ' + reason.message);
                // ADD THIS THROW error
                throw reason;
            })
    //    }*/
    }

    Login() {
        if (this.validateInputs()) {

            this.setState({spinnerMessage: 'Validando Usuario...', spinnerVisible: true});
            ApiConnect.RequestApi('POST', 'login', '{"username":"' + this.state.user + '","password":"' + this.state.password + '"}')
                .then((responseJson) => {
                    let responseObj = JSON.parse(responseJson);
                   // this.setState({spinnerVisible: false});
                    if (!('error' in responseObj)) {

                        if ('access_token' in responseObj) {
                            AsyncStorage.setItem('access_token', responseObj.access_token);
                            this.GetDataUser();
                        }
                    }
                    /*    //this.setState({spinnerVisible: false});

                       if(responseJson.ok) {
                           //let Resps:JSON = responseJson.json();
                          //let bodyResp=responseJson._bodyInit;

                            //    this.setState({modalVisible: true, mesg:  "Access Token: "+rsp.access_token});
                                AsyncStorage.setItem('access_token',rsp.access_token);
                               this.GetDataUser();
                              //  this.goToMainView();

                         // this.setState({modalVisible: true, mesg:  "Access Token: "+bodyResp.json().access_token+", body: "+bodyResp});
                         //  this.goToMainView();
                       }
                      /* else if(responseJson.status === 401){
                           this.AlertMesg("ERROR","Usuario y/o Contraseña Incorrecta");
                           this.setState({spinnerMessage:'',spinnerVisible:false});
                       }
                       else{
                           this.AlertMesg("ERROR","Error interno");
                       }
*/
                    // this.goToMainView();

                })
            /*.catch((error, statusCode) => {
                //this.AlertMesg('ERROR', 'Usuario y/o Contraseña Incorrecta');
                this.setState({spinnerVisible: false})
                console.log(error);
                //console.error(error);
            })
*/

            /*
                    this.props.navigator.push({
                        ident: "MainView"
                    });
                   Alert.alert(
                        'Alert Title',
                        'My Alert Msg',
                        [
                            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false}
                    );
                   */
        }

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        backgroundColor: '#F5FCFF',
    },
    img: {
        width: 300,
        height: 300,
        marginBottom: 10
    },
    backgroundIm: {
        flex: 1,
        position: 'relative',
        resizeMode: 'cover'
    },
    modalText: {
        paddingTop: 50,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    logginInputs: {
        textAlign: 'center',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 4,
        /* borderColor: '#ffff000',*/

    },

    submit: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#68a0cf00',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fff'
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    }
});
