/**
 * Created by liaoye on 2016/12/1.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    InteractionManager
} from 'react-native';

import StatusBars from '../component/StatusBars';
import NavigationBar from 'react-native-navbar';
import Line from '../component/Line';
import Button from 'apsl-react-native-button';
import Home from '../view/Home';
import IconButton from '../component/IconButton';
import Utils from '../util/Utils';
import firebase from 'firebase';

import {
    navTintColor,
    titleTintColor,
    bgColor,
    textPrimaryColor,
    accentColor
} from '../constants/global-constants';

export default class RegistView extends Component{

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
        this.back = this.back.bind(this);
        this.toRegist = this.toRegist.bind(this);
        this.registerListener();
    }

    back(){
        this.props.navigator && this.props.navigator.pop();
    }

    //注册登录的监听事件
    registerListener(){
        let weakThis = this;
        firebase.auth().onAuthStateChanged(function (user) {
            Utils.dismiss();
            if(user){
                console.log('登陆成功');
                console.log('用户的email',user.email);
                console.log('用户的uid',user.uid);
                InteractionManager.runAfterInteractions(()=>{
                    weakThis.props.navigator && weakThis.props.navigator.resetTo({
                        component:Home,
                    })
                });
            }
        })
    }


    render(){
        var titleConfig = {
            title: '注册',
            tintColor:titleTintColor,
            style:{fontSize:20}
        };
        return(
            <View style={{flex:1, backgroundColor:bgColor}}>
                <StatusBars/>
                <NavigationBar tintColor={navTintColor}
                               title={titleConfig}
                               style={{height:56}}
                               leftButton={<IconButton onPress={()=>Utils.naviGoBack(this.props.navigator)}/>}/>

                <View style={[styles.item,{marginTop:32}]}>
                    <Text style={styles.text}>
                        {'邮箱：'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'请输入邮箱'}
                        onChangeText={(val)=>this.setState({email:val})}
                        underlineColorAndroid={'transparent'}/>
                </View>
                <Line/>

                <View style={styles.item}>
                    <Text style={styles.text}>
                        {'密码：'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'请输入密码'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(val)=>this.setState({password:val})}
                        secureTextEntry={true}/>
                </View>
                <Line/>

                <Button style={styles.button}
                        textStyle={styles.btnText}
                        onPress={this.toRegist}>
                    {'注册并登陆'}
                </Button>

            </View>
        );
    }

    toRegist(){
        let email = this.state.email;
        let password = this.state.password;
        if(!email || !password){
            return Utils.showInfo('请输入邮箱和密码!');
        }
        Utils.showLoading('正在注册并登陆...');
        firebase.auth().createUserWithEmailAndPassword(email,password).catch(function (error) {
            Utils.dismiss();
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("错误码为",errorCode+'');
            console.log("错误信息为",errorMessage);
        })
    }

}

const styles = StyleSheet.create({
    item:{
        flexDirection: 'row',
        marginHorizontal:16,
        height:64,
        alignItems:'center',
    },
    text:{
        fontSize:16,
        color:textPrimaryColor,
    },
    input:{
        marginLeft:8,
        fontSize:16,
        color:textPrimaryColor,
        flex:1,
        paddingVertical:5
    },
    button:{
        backgroundColor:accentColor,
        marginHorizontal:16,
        marginTop:16,
    },
    btnText:{
        fontSize:14,
        color:'#ffffff'
    }
});
