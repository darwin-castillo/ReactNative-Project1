import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    ToastAndroid,
    Button,
    DrawerLayoutAndroid,
    ImageBackground,
    TouchableHighlight,
    FlatList,
    Dimensions,
    Alert,
    AsyncStorage,
    Image,
    ScrollView,
} from 'react-native';

import Tabs from 'react-native-tabs';
//import  Icon from 'react-native-vector-icons/FontAwesome';
import {navigation, NavigationDrawer} from "../common/navigation";
import {StackNavigator, NavigationActions} from 'react-navigation';
import Icon from 'react-native-fa-icons';
import {GoView} from "../common/drawer";
import PopoverTooltip from "react-native-popover-tooltip";

import QRCode from 'react-native-qrcode';
import {StorageConnect} from "../utilities/StorageConnect";
//import { BarCodeScanner, Permissions } from "expo";

var {height} = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;

export class MainView extends Component {
    navigationOptions: {
        title: 'MainView',
        headerLeft: null
    }


    resetNavigation(targetRoute) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: targetRoute}),

            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    handleSignOut() {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }


    state = {
        hasCameraPermission: null,
        page: 'Main',
        contractCode: '',
        imageUser:'../../assets/avatar.png',
        userStatusTitle:'',
        name:'',
        phone:'',
        email:'',
        qr:'{\'id\':\'321\',\'sponsorContract\':\'ZIPPY90000\'}',
    };


    /*
         componentDidMount() {
             this._requestCameraPermission();
         }

         _requestCameraPermission = async () => {
             const { status } = await Permissions.askAsync(Permissions.CAMERA);
             this.setState({
                 hasCameraPermission: status === 'granted',
             });
         };

         _handleBarCodeRead = data => {
             Alert.alert(
                 'Scan successful!',
                 JSON.stringify(data)
             );
         };
         */
    constructor(){
        super();
        StorageConnect.searchKey('contractCode').then((resp) => {
            this.setState({contractCode: resp})
        });
        StorageConnect.searchKey('image').then((resp) => {
            this.setState({imageUser: resp})
        });
        StorageConnect.searchKey('name').then((resp) => {
            this.setState({name: resp})
        });
        StorageConnect.searchKey('phone').then((resp) => {
            this.setState({phone: resp})
        });
        StorageConnect.searchKey('userStatusTitle').then((resp) => {
            this.setState({userStatusTitle: resp})
        });
        StorageConnect.searchKey('email').then((resp) => {
            this.setState({email: resp})
        });
    }
    GoToBuy(page) {
       if(page!=='Main')
          this.props.navigation.navigate(page);
    }

    render() {
        var self = this;
        return (
            <View style={styles.container}>


                <ImageBackground
                    resizeMode='stretch'
                    style={[styles.box, styles.box1]}
                    source={require('../../assets/header.png')}>
                    <Image
                        style={{width: 100, height: 100,  borderRadius:100,}}
                        source={{uri: this.state.imageUser}}
                    />

                    <Text style={{fontSize: 25, color: 'black', borderColor: 'black'}}>Invitado</Text>
                </ImageBackground>

                <View style={[styles.box, styles.box2,{alignItems:'center'}]}>
                    <Text style={{color: 'white', fontSize: 20, paddingTop:10, paddingBottom:10}}>
                        <Icon name='user' allowFontScaling/>
                        {'  '+this.state.name+"  "}
                        {"    "}
                        <Icon name='phone' allowFontScaling/>
                        {"  "+this.state.phone}

                    </Text>

                    <View style={{
                        paddingBottom:10,
                        paddingTop: 10,
                        backgroundColor:'white',
                        alignItems:'center',
                        width:270,
                        justifyContent:'center',
                        borderRadius:10,
                        height:270}}>
                    <QRCode
                        value={this.state.qr}
                        size={250}
                        bgColor='black'
                        fgColor='white'/>
                    </View>
                    <View style={{alignItems:'center', paddingBottom:5}}>
                    <Text style={{color: 'white', fontSize: 20}}>
                        <Icon name='qrcode' allowFontScaling/>
                        {"   "+this.state.contractCode+"  "}
                    </Text>
                        <Text style={{color: 'white', fontSize: 20}}>
                            {'Valido Hasta: '}
                            {" "}

                        </Text>
                    </View>
                </View>
                <View style={[styles.box, styles.box3]}>
                    <Tabs selected={this.state.page} style={{backgroundColor: 'white'}}
                          selectedStyle={{}} /* onSelect={el=>this.setState({page:el.props.name})}*/
                          onSelect={(el) => {
                              this.setState({page: el.props.name});
                              this.GoToBuy(el.props.name);
                          }}
                    >

                        <View  name="Main" style={{alignItems:'center',}} selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'green'}}>
                            <Icon  name="user"   />
                            <Text name="Main">Perfil</Text>
                        </View>
                        <View  name="BuyProduct" style={{alignItems:'center',}} selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'green'}}>
                            <Icon  name="shopping-cart"   />
                            <Text name="BuyProduct">Productos</Text>
                        </View>
                        <View  name="a" style={{alignItems:'center',}} selectedIconStyle={{borderTopWidth: 2,borderTopColor: 'green'}}>
                            <Icon  name="map"   />
                            <Text name="a">Mapa</Text>
                        </View>
                        <View  name="b" style={{alignItems:'center',}} selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'green'}}>
                            <Icon  name="envelope-open"   />
                            <Text name="b">Invitar</Text>
                        </View>
                        <View  name="c" selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'green'}}>
                        <PopoverTooltip
                            ref='tooltip_pass'
                            labelSeparatorColor='gray'
                            buttonComponent={
                            <View style={{alignItems:'center',}}>
                            <Icon  name="ellipsis-h"   />
                            <Text name="c">Más</Text>
                            </View>

                            }

                            items={[
                                {
                                    label: 'Cerrar Sesión',
                                    onPress: () => {
                                        Alert.alert('Sesión de Usuario', 'Realmente desea cerrar sesión ?',
                                                [
                                                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                {text: 'SI', onPress: () => {this.handleSignOut()}},
                                                    {text: 'NO', onPress: () => console.log('OK Pressed')},
                                                ],
                                            {cancelable: false});
                                    }
                                },
                                {
                                    label: 'Cambiar Contraseña',
                                    onPress: () => {
                                    }
                                }

                            ]}
                            // animationType='timing'
                            // using the default timing animation
                        />
                        </View>

                    </Tabs>
                </View>
            </View>
        );
    }

    /* uncomment
        render(){
         //   this.resetNavigation('myRouteWithDisabledBackFunctionality');


       var navi=<GoView/>;
            return(
                //todo: make a component to this
                <DrawerLayoutAndroid
                    drawerWidth={300}
                    ref={(_drawer) => this.drawer = _drawer}
                    drawerPosition={DrawerLayoutAndroid.positions.right}
                    renderNavigationView={() => navi}>

                    <View style={styles.container}>

                            <ImageBackground
                                resizeMode='stretch'
                                style={[styles.box, styles.box1]}
                                source={require('../../assets/header.png')}>
                            <Image
                                style={{width: 100, height: 100}}
                                source={require('../../assets/avatar.png')}
                            />

                            <Text style={{fontSize:25, color:'black', borderColor:'black'}}>Invitado</Text>
                            </ImageBackground>

                        <View style={[styles.box, styles.box2]}>
                            <Text style ={{color:'white', fontSize:20}}>
                                Darwin Castillo
                                <Icon name='user' allowFontScaling />

                            </Text>

                            <TouchableHighlight style={{
                                borderColor:'white',
                            }}
                            onPress={()=>{this.GoToBuy()}}
                            >
                                <Text style={{color:'white'}}>presione aqui</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={[styles.box, styles.box3]}></View>
                    </View>
                </DrawerLayoutAndroid>
            );


        }
        uncomment */
}


const styles = StyleSheet.create({
    MainContainer: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    TextStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    box: {
        height: box_height
    },
    box1: {
        backgroundColor: '#ffffff',
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box2: {
        backgroundColor: '#114512',
        flex: 10
    },
    box3: {
        backgroundColor: '#114512',
        flex: 2,

    }

});
/*
           {this.state.hasCameraPermission === { }?
               <Text>Requesting for camera permission</Text> :
               this.state.hasCameraPermission === false ?
                   <Text>Camera permission is not granted</Text> :
                   <BarCodeScanner
                       onBarCodeRead={this._handleBarCodeRead}
                       style={{ height: 200, width: 200 }}
                   />
           }
           */
