import React,{Component} from 'react'
import {
    Text,
    ImageBackground,
    TouchableHighlight,
    Alert,
    ScrollView, Dimensions, StyleSheet,
} from 'react-native';
import Icon from 'react-native-fa-icons';
import {StackNavigator,NavigationActions } from 'react-navigation';

var { height } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;


export const navigationView = (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <ImageBackground
            resizeMode='stretch'
            style={{ height: box_height,
                backgroundColor: '#ffffff',
                flex:4,
                justifyContent: 'center',
                alignItems: 'center'}}
            source={require('../../assets/header.png')}>
            <Text>Hey Hey</Text>
        </ImageBackground>
        <TouchableHighlight
            style={ { justifyContent: 'center',}}
            onPress={()=>{

            }}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='user' allowFontScaling />    Mi Perfil</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={ { justifyContent: 'center',}}
            onPress={()=>{
                // this.props.navigation.navigate('BuyProduct');
                //  goTo();
                this.goTo();

            }}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='shopping-cart' allowFontScaling />    Solicitar Producto</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={ { justifyContent: 'center',}}
            onPress={()=>{

            }}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='bolt' allowFontScaling />    Mis Juegos</Text>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={()=>{

            }}
            style={ { justifyContent: 'center',}}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='map' allowFontScaling />     Mapa Carritos</Text>
        </TouchableHighlight>

        <TouchableHighlight
            onPress={()=>{

            }}
            style={ { justifyContent: 'center',}}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='cart-arrow-down' allowFontScaling />     Entrega de Productos</Text>
        </TouchableHighlight>



        <TouchableHighlight
            onPress={()=>{

            }}
            style={ { justifyContent: 'center',}}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='user' allowFontScaling />     Escanear </Text>
        </TouchableHighlight>

        <TouchableHighlight
            onPress={()=>{

            }}
            style={ { justifyContent: 'center',}}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='user' allowFontScaling />     Invitar</Text>
        </TouchableHighlight>

        <TouchableHighlight
            onPress={()=>{

            }}
            style={ { justifyContent: 'center',}}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='user' allowFontScaling />     Notificaciones</Text>
        </TouchableHighlight>


        <TouchableHighlight
            onPress={()=>{

            }}
            style={ { justifyContent: 'center',}}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='user' allowFontScaling />     Configurar QR</Text>
        </TouchableHighlight>


        <TouchableHighlight
            onPress={()=>{

            }}
            style={ { justifyContent: 'center',}}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            ><Icon name='user' allowFontScaling />     Cambiar Contraseña </Text>
        </TouchableHighlight>

        <TouchableHighlight
            onPress={()=>{

            }}
            style={ { justifyContent: 'center',}}
        >
            <Text
                style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                    backgroundColor: '#FFF', justifyContent:'center'}}
            > <Icon name='user' allowFontScaling />     Cerrar Sesión</Text>
        </TouchableHighlight>


    </ScrollView>
);

export class  GoView extends  Component{

    super(props){
        this.props=props;
        this.goTo = this.goTo.bind(this);
    }

    render(){
        return(
            <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
                <ImageBackground
                    resizeMode='stretch'
                    style={{ height: box_height,
                        backgroundColor: '#ffffff',
                        flex:4,
                        justifyContent: 'center',
                        alignItems: 'center'}}
                    source={require('../../assets/header.png')}>
                    <Text>Hey Hey</Text>
                </ImageBackground>
                <TouchableHighlight
                    style={ { justifyContent: 'center',}}
                    onPress={()=>{

                    }}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='user' allowFontScaling />    Mi Perfil</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={ { justifyContent: 'center',}}
                    onPress={()=>{


                        //  goTo();


                    }}
                >

                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='shopping-cart' allowFontScaling />    Solicitar Producto</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={ { justifyContent: 'center',}}
                    onPress={()=>{

                    }}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='bolt' allowFontScaling />    Mis Juegos</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={()=>{

                    }}
                    style={ { justifyContent: 'center',}}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='map' allowFontScaling />     Mapa Carritos</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={()=>{

                    }}
                    style={ { justifyContent: 'center',}}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='cart-arrow-down' allowFontScaling />     Entrega de Productos</Text>
                </TouchableHighlight>



                <TouchableHighlight
                    onPress={()=>{

                    }}
                    style={ { justifyContent: 'center',}}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='user' allowFontScaling />     Escanear </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={()=>{

                    }}
                    style={ { justifyContent: 'center',}}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='user' allowFontScaling />     Invitar</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={()=>{

                    }}
                    style={ { justifyContent: 'center',}}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='user' allowFontScaling />     Notificaciones</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={()=>{

                    }}
                    style={ { justifyContent: 'center',}}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='user' allowFontScaling />     Configurar QR</Text>
                </TouchableHighlight>


                <TouchableHighlight
                    onPress={()=>{

                    }}
                    style={ { justifyContent: 'center',}}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    ><Icon name='user' allowFontScaling />     Cambiar Contraseña </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={()=>{

                    }}
                    style={ { justifyContent: 'center',}}
                >
                    <Text
                        style={{fontSize:20, paddingTop:20, paddingBottom:20,  alignItems: 'center',
                            backgroundColor: '#FFF', justifyContent:'center'}}
                    > <Icon name='user' allowFontScaling />     Cerrar Sesión</Text>
                </TouchableHighlight>


            </ScrollView>

        );
    }

    goTo(){
        this.props.navigation.navigate('BuyProductView');


       /* Alert.alert('hey','hey', [
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],);*/
    }
}
const styles= StyleSheet.create({
    box: {
        height: box_height,
    },
    box1: {
        backgroundColor: '#ffffff',
            flex:4,
            justifyContent: 'center',
            alignItems: 'center'
    },
});