/**
 * Created by liaoye on 2016/12/22.
 */
import React,{Component} from 'react';
import {
    View,
    Text
} from 'react-native';


import Drawer from 'react-native-drawer';
import MenuView from './MenuView';
import MainView from './MainView';


export default class DrawerView extends Component{
    constructor(props){
        super(props);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    openMenu(){
        this._drawer.open();
    }

    closeMenu(){
        this._drawer.close();
    }

    render () {

        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                openDrawerOffset={0.3}
                content={<MenuView/>}>
                <MainView onPress={this.openMenu} navigator={this.props.navigator}/>
            </Drawer>
        )
    }
}