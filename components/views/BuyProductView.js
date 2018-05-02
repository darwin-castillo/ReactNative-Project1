import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    ToastAndroid,
    ImageBackground,
    Dimensions,
    Alert,
    AsyncStorage,
    ListView,
} from 'react-native';
import Tabs from 'react-native-tabs';

import {navigation, NavigationDrawer} from "../common/navigation";
import {StackNavigator,NavigationActions } from 'react-navigation';
import Icon from 'react-native-fa-icons';
import PopoverTooltip from "react-native-popover-tooltip";
import { FloatingAction } from 'react-native-floating-action';
import ApiConnect from "../utilities/ApiConnect";
import Spinner from "react-native-loading-spinner-overlay";
import PopupDialog, {DialogButton, DialogTitle, SlideAnimation} from 'react-native-popup-dialog';


let { height } = Dimensions.get('window');
let box_count = 3;
let box_height = height / box_count;



const slideAnimation = new SlideAnimation({
    slideFrom: 'right',
});
const actions = [{
    text: 'Agregar Socio',
    icon: require('../../assets/avatar.png'),
    name: 'bt_sponsor',
    color: '#fff',
    position: 2
}, {
    text: 'Agregar Producto',
    icon: require('../../assets/avatar.png'),
    name: 'bt_product',
    color: '#fff',
    position: 1
},
    {
        text: 'Devolución de Producto',
        icon: require('../../assets/avatar.png'),
        name: 'bt_getback',
        color: '#fff',
        position: 3
    },
 ];

export class  BuyProductView extends Component{
producto ="";
sponsor="";
    back=false;
    constructor(props){
        super(props);
        let prod="";
        let spons="";
        let SponsorOrProduct="";
        this.state = {
            hasCameraPermission: null,
            page: 'BuyProduct',
            torchMode: 'off',
            cameraType: 'back',
            socio:'Socio',
           visible:this.back,
            productTypeTitle:'',
            codeProduct:'',
            productState:'Buen Estado',
            listOfProducts:[],
            listOfSponsors:[""],
            albums: [],

        };
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});

        if(this.props.navigation.state.params)
        {
            if(this.props.navigation.state.params.producto!==undefined){
              //  ToastAndroid.show(this.props.navigation.state.params.data,ToastAndroid.SHORT);
                prod=this.props.navigation.state.params.producto;
                spons=this.props.navigation.state.params.socio;
                SponsorOrProduct = this.props.navigation.state.params.nave;
                this.searchAndAddSponsorProduct(SponsorOrProduct,this.props.navigation.state.params.data);


            }
           if(this.props.navigation.state.params.back){
                this.back=true;
              if(this.props.navigation.state.params.data){
                  this.searchGetBack(this.props.navigation.state.params.data);
              }
           }
        }

        //this.producto=""+prod;
        //this.sponsor=""+spons;
    }

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
     //   ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    handleSignOut(){
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    searchGetBack(codeProduct){

        ApiConnect.RequestApi('GET', 'products/?where=[["field":"code", "value":"'+codeProduct+'","op":"eq"]]',null)
            .then((responseJson) => {
                 let rsp = JSON.parse(responseJson);
                        this.setState({visible:false});
                        if(rsp.count>=1){
                            if(!rsp.list[0].available) {
                                this.setState(
                                    {
                                        productTypeTitle: rsp.list[0].productTypeTitle,
                                        codeProduct: rsp.list[0].code,
                                        //{"list":[{"state":1,"products":"code01","byClient":false,"detail":"se encontró cerca de la piscina olvidado"},{...}]}
                                    });

                                this.popupDialog.show();
                            }
                            else{
                                this.AlertMesg('ERROR EN DEVOLUCIÓN','Producto sin salida!')
                            }
                        }
                        else{
                            this.AlertMesg('ERROR EN DEVOLUCIÓN','Producto No Registrado')
                        }



            })
    }

    searchAndAddSponsorProduct(sponsorOrProduct, data){
       // ToastAndroid.show("Entrando en "+sponsorOrProduct+" data: "+data,ToastAndroid.SHORT);
        if(sponsorOrProduct === 'Socio'){

           let idQr = "";
           let sponsorContract = "";
            this.AlertMesg('api',data);
           let dataObj = JSON.parse(data);
                //get contract code
                idQr = dataObj.id;
                sponsorContract = dataObj.sponsorContract;
           //  ToastAndroid.show("id es: "+idQr," Sponsor "+sponsorContract,ToastAndroid.SHORT);

             /*   let whereCustomer ="[[\"join\":\"sponsor\",\"where\":[[\"op\":\"eq\",\"field\":\"contractCode\",\"value\":\"" + sponsorContract + "\"]]]]";
                // now prepare to get data user by sponsorContract
                ApiConnect.RequestApi('GET', 'qr/codes/'+idQr+'/?offset=0&where='+whereCustomer,null)
                    .then((response) => {
                                let responseJson = JSON.parse(response);
                                this.setState({visible:false});
                                ToastAndroid.show("sponsorName: "+responseJson.sponsorName,ToastAndroid.SHORT);
                                let arrayvar = this.state.listOfSponsors.slice();
                                arrayvar.push(responseJson.sponsorName);
                                this.setState({ listOfSponsor: arrayvar });
                    })
*/
        }


    }


    productGetBack(codeProduct){
     //let payload='{"list":[{"state":1,"products":"'+k+'","byClient":false,"detail":"se encontró cerca de la piscina olvidado"},{...}]}';
        let payload = {
            list: [
                {
                    code: ""+codeProduct,
                    byClient: true,
                    detail: "",
                    state: 1,
                }
            ]
        };
        let payloadStr = JSON.stringify(payload);
        //ToastAndroid.show(payloadStr,ToastAndroid.LONG);
                        ApiConnect.RequestApi('POST', 'getback',payloadStr)
                            .then((responseJson) => {
                                this.setState({visible:false});
                                if(responseJson.ok) {
                                    responseJson.json().then((rsp)=>{

                                        let msg ="";
                                        if (rsp.message==='ok') {
                                            msg = "Se Generó Correctamente la salida del producto";

                                        } else {
                                            msg = "Error Desconocido";

                                        }
                                        this.AlertMesg('Estado del Producto',msg);


                                    })

                                }
                                else{
                                    this.AlertMesg("ERROR","Error interno "+payloadStr);
                                }

                            })

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


    GoToBuy(page) {
        this.props.navigation.navigate(page);
    }

    render(){
        return(
            <View style={styles.container}>
                <PopupDialog
                    dialogTitle={<DialogTitle titleTextStyle={{fontSize:20}} title="Recepción de Productos" />}
                    actions={[
                        <DialogButton
                            text={"Estado del Producto: "+this.state.productState}
                            onPress={() => {
                                this.popupDialog.dismiss();
                            }}
                            key="button-3"
                        />,
                        <DialogButton
                            text="Cerrar"
                            onPress={() => {
                                this.popupDialog.dismiss();
                            }}
                            key="button-2"
                        />,
                        <DialogButton
                            text="Guardar"

                            onPress={() => {
                                this.setState({visible: true,});
                                this.productGetBack(this.state.codeProduct);
                                this.popupDialog.dismiss();
                            }}
                            key="button-1"
                        />,
                    ]}
                    ref={(popupDialog) => { this.popupDialog = popupDialog;  }}
                    dialogAnimation={slideAnimation}
                >
                    <ImageBackground
                        resizeMode='stretch'
                        style={[styles.box1]}
                        source={require('../../assets/header.png')}>
                        <Text style={{fontSize: 17, color: 'white', borderColor: 'black'}}>{'Producto: '+this.state.productTypeTitle+" "+this.state.codeProduct}</Text>

                    </ImageBackground>
                </PopupDialog>
                <PopupDialog
                    dialogTitle={<DialogTitle titleTextStyle={{fontSize:20}} title="Estado del Producto" />}
                    actions={[
                        <DialogButton
                            text={"Buen Estado"}
                            onPress={() => {
                                this.setState({stateProduct:'Buen Estado'});
                                this.stateProdDialog.dismiss();
                                this.popupDialog.show();
                            }}
                            key="b-5"
                        />,
                        <DialogButton
                            text="Mal Estado"
                            onPress={() => {
                                this.setState({stateProduct:'Mal Estado'});
                                this.stateProdDialog.dismiss();
                                this.popupDialog.show();
                            }}
                            key="b-4"
                        />,
                        <DialogButton
                            text="No Entregado"
                            onPress={() => {
                                this.setState({stateProduct:'No Entregado'});
                                this.stateProdDialog.dismiss();
                                this.popupDialog.show();
                            }}
                            key="b-3"
                        />,
                        <DialogButton
                            text="Desaparecido"
                            onPress={() => {
                                this.setState({stateProduct:'Desaparecido'});
                                this.stateProdDialog.dismiss();
                                this.popupDialog.show();
                            }}
                            key="b-2"
                        />,
                        <DialogButton
                            text="Entregado Por El Cliente"
                            onPress={() => {
                                this.setState({stateProduct:'Entregado Por El Cliente'});
                                this.stateProdDialog.dismiss();
                                this.popupDialog.show();
                            }}
                            key="b-1"
                        />,

                    ]}
                    ref={(popupDialog) => { this.stateProdDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                >
                    <Text>Seleccionar: </Text>
                </PopupDialog>


                <Spinner visible={this.state.visible} textContent={"Buscando Producto..."} textStyle={{color: '#FFF'}} />
                <View style={[styles.box, styles.box1]}>
                    <Text style={{color: 'white', fontSize: 20}}>
                        { this.state.socio}
                    </Text>

                    <ListView
                       // enableEmptySections={true}
                        dataSource={this.dataSource.cloneWithRows(this.state.listOfSponsors)}
                        renderRow={(rowData) => <Text>{rowData}</Text>}
                    />
                </View>

                <View style={[styles.box, styles.box2]}>
                    <Text style={{color: 'white', fontSize: 20}}>
                        {'Comprar Productos'}
                    </Text>

                    <Text style={{color: 'white'}}>(Producto/Servicio que va ser adquirido)</Text>

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

                <FloatingAction
                    actions={actions}
                    buttonColor='#e4c720'
                    distanceToEdge={45}
                    onPressItem={
                        (name) => {
                            console.log(`selected button: ${name}`);
                            if(name==='bt_product'){
                                // this._onPressQRCode();
                           //    this.props.navigation.navigate('BarcodeScan',{nave:'Producto',producto: this.producto, socio:this.socio,entrega:'0'});
                            }
                            if(name==='bt_sponsor'){
                              //  ToastAndroid.show("boton sponsor "+this.producto+", "+this.sponsor,ToastAndroid.SHORT);
                             //   this.props.navigation.navigate('BarcodeScan',{nave:'Socio',producto: this.producto, socio:this.sponsor,entrega:'0'})
                            }
                            if(name === 'bt_getback'){
                               // this.props.navigation.navigate('BarcodeScan',{nave:'Producto',entrega:'1'})
                            }
                        }
                    }
                />

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
        backgroundColor: '#114512',
        borderBottomColor:'#fff',
        borderBottomWidth:2,
        flex:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box2: {
        backgroundColor: '#114512',
        flex:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box3: {
        backgroundColor: '#114512',
        flex:2,

    }

});

