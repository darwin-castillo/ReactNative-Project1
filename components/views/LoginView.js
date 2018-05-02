import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    Modal,
    Button,
    ImageBackground,
    AsyncStorage,
    TouchableHighlight,
    NativeModules,
    StyleSheet, Platform
} from "react-native";


const RNFetch = NativeModules.RNFetchssl;
import PopoverTooltip from 'react-native-popover-tooltip';
import {MainView} from "./LoginView";
import { App} from "../../App"
import Spinner from 'react-native-loading-spinner-overlay';
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

const platform = Platform.select({
    ios: 'ios',
    android: 'android',
});

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
        if (this.state.password == null || this.state.password === '') {
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
        else if (this.state.user == null || this.state.user === '') {
            ms_usr = 'Debe ingresar el usuario para iniciar sesion';
            this.setState({tooltip_msg_usr: ms_usr});
            this.refs['tooltip_usr'].toggle();
            if (this.userTextInput != null)
                this.userTextInput.focus();
            return false;
        }

        return true;

    }


    goToMainView() {
        this.props.navigation.navigate('Main');
    }

    GetDataUser() {
        this.setState({spinnerMessage: 'Obteniendo Data de Usuario...',});
        ApiConnect.RequestApi('GET', 'current/user', '')
            .then((responseJson) => {
           //     this.setState({spinnerMessage: '', spinnerVisible: false});

                let responseObj = null;
                if(platform === 'ios'){
                    responseObj = responseJson;
                }
                else if(platform === 'android'){
                    responseObj =   JSON.parse(responseJson);
                }

console.log('entro en getDataUser');
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
              //  this.goToMainView();
                this.GetDataQR();
            })
            .catch(reason => {
                this.setState({spinnerVisible: false});
                let code = reason.code;
                if(code==='401')
                    this.AlertMesg('ERROR','Usuario y/o Contraseña Invalidos');
                else if(code==='500')
                    this.AlertMesg('ERROR','ERROR INTERNO');
                else if(code==='403')
                    this.AlertMesg('ERROR','Acceso y/o Acción No Permitida');
                else
                    this.AlertMesg('ERROR '+code!==null&&code!==undefined?code:'',
                        'No existe comunicación con el servidor');
            });


    }

    GetDataQR() {

        this.setState({spinnerMessage: 'Obteniendo Información Adicional...',});
        ApiConnect.RequestApi('GET', 'current/qr', '')
            .then((response) => {

                let responseJson = null;
                if(platform === 'ios'){
                    responseJson = response;
                }
                else if (platform === 'android'){
                    responseJson = JSON.parse(response);
                }

                this.setState({spinnerMessage: '', spinnerVisible: false});

                AsyncStorage.setItem('idQR',responseJson[0].id.toString());
                this.goToMainView();

            }).catch(reason => {
            this.setState({spinnerVisible: false});
            let code = reason.code;

            if(code==='401')
                this.AlertMesg('ERROR','Usuario y/o Contraseña Invalidos');
            else if(code==='500')
                this.AlertMesg('ERROR','ERROR INTERNO');
            else if(code==='403')
                this.AlertMesg('ERROR','Acceso y/o Acción No Permitida');
            else
                this.AlertMesg('ERROR '+code!==null&&code!==undefined?code:'',
                    'No existe comunicación con el servidor');
        })

    }





    Login() {
        if (this.validateInputs()) {

        // this.setState({spinnerMessage: 'Validando Usuario...', spinnerVisible: true});
            ApiConnect.RequestApi('POST', 'login', '{"username":"' + this.state.user + '","password":"' + this.state.password + '"}')
                .then((responseJson) => {
                  console.log("el response "+responseJson.access_token);
                   if(platform === 'android') {
                       let responseObj = JSON.parse(responseJson);
                       // console.log("por aqui esta response y token "+responseObj);
                       if (!('error' in responseObj)) {
                           if ('access_token' in responseObj) {
                               console.log('Conect to data user')
                               AsyncStorage.setItem('access_token', responseObj.access_token);
                               this.GetDataUser();
                           }
                       }
                   }
                   if(platform === 'ios'){
                       if (!('error' in responseJson)) {
                           if ('access_token' in responseJson) {
                               console.log('Conect to data user')
                               AsyncStorage.setItem('access_token', responseJson.access_token);
                               this.GetDataUser();
                           }
                       }
                   }
                })
              .catch(reason => {
                  console.log("reason "+reason);
                  console.log("reason parsed: "+JSON.stringify(reason));
                  console.log("reason code: "+reason.code);
                    this.setState({spinnerVisible: false});
                  let code = reason.code;
                  if(code==='401')
                      this.AlertMesg('ERROR','Usuario y/o Contraseña Invalidos');
                  else if(code==='500')
                      this.AlertMesg('ERROR','ERROR INTERNO');
                  else if(code==='403')
                      this.AlertMesg('ERROR','Acceso y/o Acción No Permitida');
                  else
                      this.AlertMesg('ERROR '+code!==null&&code!==undefined?code:'',
                          'No existe comunicación con el servidor');

                })

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
