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
    StatusBar,
} from 'react-native';

import Tabs from 'react-native-tabs';
//import  Icon from 'react-native-vector-icons/FontAwesome';
import {navigation, NavigationDrawer} from "../common/navigation";
import {StackNavigator, NavigationActions} from 'react-navigation';
import Icon from 'react-native-fa-icons';
import {GoView} from "../common/drawer";
import PopoverTooltip from "react-native-popover-tooltip";


import {StorageConnect} from "../utilities/StorageConnect";
import QRCode from "react-native-qrcode";
//import { BarCodeScanner, Permissions } from "expo";

var {width, height} = Dimensions.get('window');
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
    componentWillMount() {
        StatusBar.setHidden(true);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
    //    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
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
        idQR:'',
        qr:'{\"id\":\"321\",\"sponsorContract\":\"ZIPPY90000\"}',

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
        StorageConnect.searchKey('idQR').then((resp) => {
            this.setState({idQR: resp,
                qr:'{\"id\":\"'+resp+'\",\"sponsorContract\":\"'+this.state.contractCode+'\"}',
            });



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
                 source={require('../../assets/fondo_header.png')}
                >
                  <View style={{
                      flexDirection:'column',
                      alignItems:'flex-end',
                      justifyContent:'flex-end',
                      marginRight:10,}}>
                    <Text style={{fontSize:25,}}>Invitado</Text>
                  </View>

                    <View style={{
                        borderTopColor:'black',
                        borderBottomColor:'black',
                        borderLeftColor:'black',
                        borderTopWidth:1,
                        borderRightColor:'black',
                        borderBottomWidth:1,
                        borderRightWidth:1,
                        borderLeftWidth:1,
                        marginBottom:2,
                        marginTop:5,
                        marginLeft:5,
                        marginRight:10,
                        alignSelf:'flex-end',
                        padding:2,

                    }}
                          >
                <Image
                        style={{width: 60, height: 60,  borderRadius:0, borderWidth:1, margin:2,}}
                        source={{uri: this.state.imageUser}}
                    />
                        <Text style={{fontFamily:'Montserrat-Thin',fontSize:12,textAlign: 'center',backgroundColor:'black',color:'white'}}>Principal</Text>

</View>
                </ImageBackground>

                <View style={[styles.box, styles.box2,{alignItems:'center', }]}>
                <View style={{ flexDirection: 'row',}}>

                   <View style={{flex: 0.9,}}>
                    <Text style={
                        {fontSize:12,
                            fontFamily: 'Montserrat-Light',
                            color:'white',
                            alignSelf:'flex-start', marginLeft:1,marginTop:1}}>MIEMBRO</Text>

                    <Text style={{color: 'white',
                            fontSize: 12,
                        fontFamily: 'Montserrat-Light',
                            paddingBottom:0, }} >
                        {this.state.name}
                    </Text>
                   </View>



                    <View style={{marginLeft:'auto'}}>
                        <Text style={
                            {fontSize:12,
                                color:'white',
                                fontFamily: 'Montserrat-Light',
                                alignSelf:'flex-start',marginTop:1, marginRight:0}}>VALIDO HASTA</Text>
                        <Text
                            style={{color: 'white',
                                fontSize: 12,
                                marginRight:5,
                                fontFamily: 'Montserrat-Light',
                                paddingBottom:0,}}>
                         01/01/2018
                        </Text>
                    </View>
                </View>

<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <View style={{
                        paddingBottom:10,
                        paddingTop: 10,
                        backgroundColor:'white',
                        alignItems:'center',
                        width: height*.45,
                        height: height* .45,
                        justifyContent:'center',
                        borderRadius:10,

                         }}>
                    <QRCode
                        value={this.state.qr}
                        size={height*.35}
                        bgColor='black'
                        fgColor='white'/>
                    </View>

                    <View style={{alignItems:'center', paddingBottom:5}}>
                    <Text style={{color: 'white', fontSize: 14, fontFamily: 'Montserrat-Light',marginRight:2,}}>
                        <Icon name='qrcode' allowFontScaling/>
                        {"   "+this.state.contractCode+"  "}
                    </Text>

                    </View>
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
                            <Text style={{fontFamily: 'Montserrat-Light',fontSize:12}} name="Main">Perfil</Text>
                        </View>
                        <View  name="BuyProduct" style={{alignItems:'center',}} selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'green'}}>
                            <Icon  name="shopping-cart"   />
                            <Text style={{fontFamily: 'Montserrat-Light', fontSize:12}} numberOfLines={1} name="BuyProduct">Productos</Text>
                        </View>
                        <View  name="a" style={{alignItems:'center',}} selectedIconStyle={{borderTopWidth: 2,borderTopColor: 'green'}}>
                            <Icon  name="map"   />
                            <Text style={{fontFamily: 'Montserrat-Light',fontSize:12}} name="a">Mapa</Text>
                        </View>
                        <View  name="b" style={{alignItems:'center',}} selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'green'}}>
                            <Icon  name="envelope-open"   />
                            <Text  style={{fontFamily: 'Montserrat-Light',fontSize:12}} name="b">Invitar</Text>
                        </View>
                        <View   name="c" selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'green'}}>
                        <PopoverTooltip
                            ref='tooltip_pass'
                            labelSeparatorColor='gray'
                            buttonComponent={
                            <View style={{alignItems:'center',}}>
                            <Icon  name="ellipsis-h"   />
                            <Text style={{fontFamily: 'Montserrat-Light',fontSize:12,}} name="c">Más</Text>
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
    gridView:{
       // borderTopWidth:1,
       // borderBottomWidth:1,
        width:width,
        marginLeft:10,
        marginRight:10,
       // borderTopColor:'white',
      //  borderBottomColor:'white',
      //  borderLeftColor:'white',
      //  borderRightColor:'white'
    },
    TextStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    container: {
      flex: 1,
        flexDirection: 'column',

    },
    box: {
        height: box_height
    },
    box1: {
        backgroundColor: '#ffffff',
        flex: 3,
        flexDirection: 'row',
       justifyContent:'flex-end',
        padding:1,
    },
    box2: {
        backgroundColor: '#114512',
        flex: 12,

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
