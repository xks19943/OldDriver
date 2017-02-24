/**
 * Created by liaoye on 2017/2/7.
 */
import React,{ Component } from 'react';
import {
    AsyncStorage
} from 'react-native';

export default class Storage{
    //存储字符串
    static saveString(key, value) {
        return AsyncStorage.setItem(key,value);
    }

    //获取字符串
    static getString(key){
        return AsyncStorage.getItem(key).then((value)=>value);
    }
}