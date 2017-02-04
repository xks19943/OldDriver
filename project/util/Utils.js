/**
 * Created by liaoye on 2016/12/21.
 */
import React,{ Component,}from 'react';
import {
    Platform,
    NativeModules,
} from 'react-native';
import moment from 'moment';
var DialogLoadModule = NativeModules.DialogLoadModule;
var Utils={
    //显示加载进度条
    showLoading:function (msg) {
        DialogLoadModule.showLoading({
            msg: msg
        }, function () {

        });
    },

    //隐藏加载进度条
    dismiss:function () {
        DialogLoadModule.dismiss({
            msg: ''
        }, function () {
            //console.log('dismiss');
        });
    },
    
    //显示toast信息
    showInfo:function (msg) {
        DialogLoadModule.showInfo({
            msg: msg
        });
    },

    //返回上一个页面的方法
    naviGoBack: function (navigator) {
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    },
    
    //判断对象是否为空
    isEmptyObject: function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    },
    
    //js中对象的深拷贝
    deepCopy:function (source) {
        var k, ret= source, b;
        if(source && ((b = (source instanceof Array)) || source instanceof Object)) {
            ret = b ? [] : {};
            for(k in source){
                if(source.hasOwnProperty(k)){
                    ret[k] = this.deepCopy(source[k]);
                }
            }
        }
        return ret;
    },

    /**
     * 格式化日期
     * @param date
     * @returns {string}
     */
    formateTime:function(time){
        return moment(time).format('YYYY-MM-DD hh:mm');
    }
};
module.exports = Utils;