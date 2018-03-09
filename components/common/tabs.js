import  React,{Component} from 'react'
import {Text
       } from 'react-native';

import Tabs from 'react-native-tabs';
import Icon from 'react-native-fa-icons';
import BuyProductView from '../views/BuyProductView';
export class TabsMenu extends Component{
    constructor(){
        super();
       this.goToView = this.goToView.bind(this);
    }
   goToView = ()=>{

    };


    render(){
         return(
             <Tabs selected={this.state.page} style={{backgroundColor: 'white'}}
                   selectedStyle={{color: 'green'}} /* onSelect={el=>this.setState({page:el.props.name})}*/
                   onSelect={(el) => {
                       this.setState({page: el.props.name});
                      // this.GoToBuy(el.props.name);
                       //BuyProductView.navigation.navigate(el.state.name);
                     //  this.goToView( el.props.name);
                       this.props.goToView(el.props.name);
                   }}
             >

                 <Text name="Main" selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>
                     <Icon name='user' allowFontScaling/></Text>
                 <Text name="BuyProduct" selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>
                     <Icon name='shopping-cart' allowFontScaling/></Text>
                 <Text name="c" selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>
                     <Icon name='map' allowFontScaling/></Text>
                 <Text name="d" selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>
                     <Icon name='cart-arrow-down' allowFontScaling/></Text>
                 <Text name="e" selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>
                     <Icon name='user' allowFontScaling/></Text>


             </Tabs>
         );
    }

}