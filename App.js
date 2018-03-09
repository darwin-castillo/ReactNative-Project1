/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';

import {
    Platform,
    StyleSheet,
    AsyncStorage,
    ToastAndroid,
    Alert,
} from 'react-native';

import {LoginView} from "./components/views/LoginView";
import {MainView} from "./components/views/MainView";
import {BuyProductView} from "./components/views/BuyProductView"
import {apiUrl, heads} from "./components/utilities/ApiConnect";
//import {MainView} from './components/views/MainViewComponent'
//7import Toast, {DURATION} from 'react-native-easy-toast'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Hey Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



type Props = {};

export var RootStack = StackNavigator(
    {
        Login: {
            screen: LoginView,
            navigationOptions: {
                header: null,

            }
        },
        Main: {
          //  screen: MainView,
            screen: MainView,
            /*navigationOptions:  {
                headerLeft: null }*/
        },
        BuyProduct: {
            //  screen: MainView,
            screen: BuyProductView,
            /*navigationOptions:  {
                headerLeft: null }*/
        },
        initialRouteName: 'Login',


    },

    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
                //  easing: Easing.out(Easing.poly(4)),
                //  timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }

);


export var OptionalStack = StackNavigator(
    {

        Main: {
            //  screen: MainView,
            screen: MainView,
            /*navigationOptions:  {
                headerLeft: null }*/
            navigationOptions: {
                header: null,

            }
        },
        Login: {
            screen: LoginView,
            navigationOptions: {
                header: null,

            }
        },

        BuyProduct: {
            //  screen: MainView,
            screen: BuyProductView,
            /*navigationOptions:  {
                headerLeft: null }*/
        },
        initialRouteName: 'Main',


    },

    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
                //  easing: Easing.out(Easing.poly(4)),
                //  timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }

);

export default  class App extends Component<Props> {
  constructor(){
     super();
     this.state = {
         LoggedIn: false,
      }

      this.getAccessToken().then((resp)=>{
          // ToastAndroid.show('Token: '+resp,ToastAndroid.SHORT);
          if(resp==null)
              this.setState({LoggedIn: false});
          else
              this.setState({LoggedIn: true});
      });

  }
     getAccessToken():Promise<Response>{
        return( AsyncStorage.getItem('access_token').then((value)=>{
            return value;
        }))

    }
        render(){


             if(this.state.LoggedIn){

                 return(<OptionalStack/>);
             }
             else {

                 return (<RootStack/>);
             }

        }


    /*
    _renderScene(route, navigator) {
        var globalProps = {navigator}
        switch (route.ident) {
            case "LoginView":
                return (
                    <LoginView
                        {...globalProps}
                    />
                );
            case "MainView":
                return (
                    <MainView
                        {...globalProps}
                    />
                );
        }
    }

    _configureScene() {

    }

    render() {

         return(
           <Navigator
           initialRoute={{ident:"LoginView"}}
           renderScene={this._renderScene}
           configureScene={this._configureScene}
           />
         );
    }

*/

}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
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
    backgroundImage: {
        flex: 1,
       /* width: null,
        height: null,
        resizeMode: 'cover'
        */
    },
    modalText:{
      paddingTop:50,
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

});
