/**
 * Created by liaoye on 2016/10/2.
 */

import React,{Component} from 'react';
import {
    Navigator,
    BackAndroid,
    View,
    NativeModules
} from 'react-native';

import Home from './view/Home';
let tempNavigator;
var SplashScreen = NativeModules.SplashScreen;
import firebase from 'firebase';
import Login from './user/LoginView';
import MainView from './view/DrawerView';
var config = {
    apiKey: "AIzaSyBdFLss5KH5bZ5MvhFrW7NZtTD2WwoXLY8",
    authDomain: "olddriver-462f6.firebaseapp.com",
    databaseURL: "https://olddriver-462f6.firebaseio.com",
    storageBucket: "olddriver-462f6.appspot.com",
    messagingSenderId: "1091326425087"
};

export default class App extends Component{

    constructor(props){
        super(props);
        var firebaseApp = firebase.initializeApp(config);
        //添加监听返回键 按下返回键到上一个页面
        BackAndroid.addEventListener('hardwareBackPress',function () {
            if(tempNavigator && tempNavigator.getCurrentRoutes().length>1){
                tempNavigator.pop();
                return true;
            }
            return false;
        })
    }

    componentDidMount(){
        SplashScreen.hide();
    }

    routeManager(route,navigator){
        let Component = route.component;
        tempNavigator = navigator;
        return (
            <View style={{flex: 1,flexDirection: 'column',}}>
                <Component {...route.params} {...route} navigator={tempNavigator}  />
            </View>
        );
    }

    render(){
        return(
            <Navigator
                style={{flex:1, flexDirection:'column'}}
                //配置默认路由
                initialRoute={{
                    name:'Main',
                    component:MainView,
                }}
                //配置动画和手势
                configureScene={()=>Navigator.SceneConfigs.FloatFromBottom}
                
                //要传递的路由和参数等
                renderScene={this.routeManager.bind(this)}
            />
        );
    }
}