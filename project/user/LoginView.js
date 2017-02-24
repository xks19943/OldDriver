/**
 * Created by liaoye on 2016/11/17.
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
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    MKTextField,
} from 'react-native-material-kit';
import StatusBars from '../component/StatusBars';
import NavigationBar from 'react-native-navbar';
import Line from '../component/Line';
import Button from 'apsl-react-native-button';
import RegistView from './RegistView';
import {
    navTintColor,
    titleTintColor,
    bgColor,
    textPrimaryColor,
    accentColor
} from '../constants/global-constants';
import IconButton from '../component/IconButton';
import firebase from 'firebase';
import Utils from '../util/Utils';
import DrawerView from '../view/DrawerView';
import Storage from '../util/Storage';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
        this.toLogin = this.toLogin.bind(this);
        this.registerListener();
    }

    registerListener(){
        let weakThis = this;
        firebase.auth().onAuthStateChanged(function (user) {
            Utils.dismiss();
            if(user){
                console.log('登陆成功');
                console.log('用户的email',user.email);
                console.log('用户的uid',user.uid);
                Storage.saveString('uid',user.uid);
                InteractionManager.runAfterInteractions(()=>{
                    weakThis.props.navigator && weakThis.props.navigator.resetTo({
                        component:DrawerView,
                    })
                });
            }else{
                console.log('没有登陆');
            }
        })
    }



    render(){
        var titleConfig = {
            title: '登陆',
            tintColor:titleTintColor,
            style:{fontSize:20}
        };
        return(
            <View style={{flex:1, backgroundColor:bgColor}}>
                <StatusBars/>
                <NavigationBar tintColor={navTintColor}
                               title={titleConfig}
                               style={{height:56}}/>

                <View style={[styles.item,{marginTop:32}]}>
                    <Text style={styles.text}>
                        {'邮箱：'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'请输入邮箱'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(val)=>this.setState({email:val})}/>
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
                        secureTextEntry={true}
                        onChangeText={(val)=>this.setState({password:val})}/>
                </View>
                <Line/>

                <Button style={styles.button} textStyle={styles.btnText} onPress={this.toLogin}>
                    {'登陆'}
                </Button>

                <View style={{marginHorizontal:16, marginTop:8, flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity>
                        <Text style={styles.text}>{'忘记密码'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toNext.bind(this,RegistView)}>
                        <Text style={styles.text}>{'注册'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    toLogin(){
        let email = this.state.email;
        let password = this.state.password;
        if(!email || !password){
            return Utils.showInfo('请输入邮箱和密码!');
        }
        Utils.showLoading('正在登陆...');
        firebase.auth().signInWithEmailAndPassword(email,password).catch(function (error) {
            Utils.dismiss();
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("错误码为",errorCode+'');
            console.log("错误信息为",errorMessage);
        })
    }


    //进入下一个页面
    toNext(componentName){
        let weakThis = this;
       InteractionManager.runAfterInteractions(()=>{
           weakThis.props.navigator && weakThis.props.navigator.push({
                component:componentName
           })
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