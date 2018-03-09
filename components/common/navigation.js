import React,{Component} from 'react'
import {
    DrawerLayoutAndroid,
    Text,
    View,
    TouchableHighlight, StyleSheet,
} from 'react-native'

export  class  NavigationDrawer extends Component{

    constructor() {
        super();
        this.openDrawer = this.openDrawer.bind(this);
    }

    openDrawer() {
        this.drawer.openDrawer();
    }
    render(){
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
        );

        return(
            <DrawerLayoutAndroid
                drawerWidth={300}
                ref={(_drawer) => this.drawer = _drawer}
                drawerPosition={DrawerLayoutAndroid.positions.right}
                renderNavigationView={() => navigationView}>
                {this.props.child}
            </DrawerLayoutAndroid>
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

});