
/**
 *网络操作工具类
 */
'use strict';

import React from 'react';

import {
    Dimensions,
    PixelRatio
} from 'react-native';


var Api = {

    /***
     * 拆分请求参数
     * @param obj
     * @returns {string}
     */
    toQueryString: function(obj){
        return obj ? Object.keys(obj).sort().map(function (key) {
            var val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map(function (val2) {
                    return  key+ '=' +val2;
                }).join('&');
            }
            return  key+ '=' + val;
        }).join('&') : '';
    },

    /**
     * get请求
     * @param url
     * @param method
     * @param params
     * @returns {Promise<T>|Promise}
     */
    getRequest:function(url,method,params) {
        var isOk;
        console.log("请求:",url + this.toQueryString(params));
        return new Promise((resolve, reject) => {
            fetch(url +this.toQueryString(params), {
                method: method,
                headers: {
                    'Accept': '*/*',
                    'encoding':'UTF-8',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((response) => {
                    if (response.ok) {
                        isOk = true;
                    } else {
                        isOk = false;
                    }
                    return response.json();
                })
                .then((responseData) => {
                    if (isOk) {
                        //console.log('请求完成之后：',responseData);
                        resolve(responseData);
                    }else {
                        reject(responseData);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },

    /***
     * post请求
     * @param url
     * @param method
     * @param body
     * @returns {Promise<T>|Promise}
     */
    postRequest:function(url,method,body) {
        var isOk;
        console.log("请求:",url + this.toQueryString(body));
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                headers: {
                    'Accept': '*/*',
                    'encoding':'UTF-8',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:this.toQueryString(body),
            }).then((response) => {
                if (response.ok) {
                    isOk = true;
                } else {
                    isOk = false;
                }
                return response.json();
            })
                .then((responseData) => {
                    if (isOk) {
                        console.log('请求完成之后：',responseData);
                        if(responseData.code == '200'){
                            resolve(responseData);
                        }else{
                            reject(responseData);
                        }
                    }else {
                        reject(responseData);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },


    /**
     * 上传图片
     * @param imageUrl
     * @returns {Promise<T>|Promise}
     */
    uploadImage: function (imageUrl) {
        return new Promise((reslove, reject)=> {
            let uri = imageUrl;
            let key = "key";
            let formData = new FormData();
            formData.append('file', {uri: uri, type: 'application/octet-stream'});
            let options = {};
            options.body = formData;
            options.method = 'post';
            options.headers = {
                'Accept': '*/*'
            };

            fetch(uploadImageUrl+'upload', options).then((response) => {
                var bodyText = response._bodyText;
                try {
                    var start = bodyText.indexOf("\<h1\>MD5:");
                    var end = bodyText.indexOf("\<\/h1\>");
                    var text = bodyText.substring(start + 8, end);
                    // console.log(bodyText, text.trim());
                    reslove(uploadImageUrl+text.trim());
                } catch (error) {
                    reject(error);
                }
            }).catch((error)=> {
                reject(error);
                //console.log(error);
            });
        });
    },

};

module.exports = Api;