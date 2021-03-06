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

let tempNavigator;
var SplashScreen = NativeModules.SplashScreen;
import firebase from 'firebase';
import LoginView from './user/LoginView';
import DrawerView from './view/DrawerView';
import UserModel from './model/UserModel';
import SplashView from './view/SplashView';
import './global/Global';

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
        this.asyncLoadUser = this.asyncLoadUser.bind(this);
    }

    asyncLoadUser(){
        let weakThis = this;
        UserModel.getUid().then((uid)=>{
            console.log('uid',uid);
            if(uid!=null){
                weakThis.loginSuccess();
            }else{
                weakThis.toLogin();
            }
            SplashScreen.hide();
        }).catch((e)=>{
            SplashScreen.hide();
        })

    }

    loginSuccess(){
        tempNavigator && tempNavigator.replace({
            component:DrawerView
        })
    }

    toLogin(){
        tempNavigator && tempNavigator.replace({
            component:LoginView
        })
    }

    componentDidMount(){
        this.asyncLoadUser();
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
                    component:SplashView,
                }}
                //配置动画和手势
                configureScene={()=>Navigator.SceneConfigs.FloatFromBottom}
                
                //要传递的路由和参数等
                renderScene={this.routeManager.bind(this)}
            />
        );
    }
}