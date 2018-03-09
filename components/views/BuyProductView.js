import React,{Component} from 'react';
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

import {navigation, NavigationDrawer} from "../common/navigation";
import {StackNavigator,NavigationActions } from 'react-navigation';
import {navigationView} from "../common/drawer";
import Icon from 'react-native-fa-icons';
import {TabsMenu} from "../common/tabs";
import PopoverTooltip from "react-native-popover-tooltip";
//import { BarCodeScanner, Permissions } from "expo";

var { height } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;

export class  BuyProductView extends Component{




    resetNavigation(targetRoute) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: targetRoute }),

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

    handleSignOut(){
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    state = {
        hasCameraPermission: null,
        page: 'BuyProduct',
    };

    GoToBuy(page) {
        this.props.navigation.navigate(page);
    }
    render(){

        return(
            <View style={styles.container}>


                <ImageBackground
                    resizeMode='stretch'
                    style={[styles.box, styles.box1]}
                    source={require('../../assets/header.png')}>
                    <Image
                        style={{width: 100, height: 100}}
                        source={require('../../assets/avatar.png')}
                    />

                    <Text style={{fontSize: 25, color: 'black', borderColor: 'black'}}>Invitado</Text>
                </ImageBackground>

                <View style={[styles.box, styles.box2]}>
                    <Text style={{color: 'white', fontSize: 20}}>
                      Comprar Productos


                    </Text>

                    <TouchableHighlight style={{
                        borderColor: 'white',
                    }}
                                        onPress={() => {
                                            this.GoToBuy()
                                        }}
                    >
                        <Text style={{color: 'white'}}>presione aqui</Text>
                    </TouchableHighlight>
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
                                                    {text: 'SI', onPress: () => console.log('OK Pressed')},
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

            //todo: make a component to this
        /*    <DrawerLayoutAndroid
                drawerWidth={300}
                ref={(_drawer) => this.drawer = _drawer}
                drawerPosition={DrawerLayoutAndroid.positions.right}
                renderNavigationView={() => navigationView}>


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
                           Entrega de Productos
                            <Icon name='user' allowFontScaling />

                        </Text>

                        <TouchableHighlight style={{
                            borderColor:'white',
                        }}
                                            onPress={()=>{this.props.navigation.navigate('Main')}}
                        >
                            <Text style={{color:'white'}}>presione aqui</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.box, styles.box3]}></View>
                </View>
            </DrawerLayoutAndroid>
            */
        );


    }
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
        flex:4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box2: {
        backgroundColor: '#114512',
        flex:10
    },
    box3: {
        backgroundColor: '#114512',
        flex:2,

    }

});

