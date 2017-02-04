/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-10-19 18:09:57
 * @version $Id$
 */

'use strict';

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    Image,
    ProgressBarAndroid,
    ActivityIndicator
} from 'react-native';

var Dimensions = require('Dimensions');

var styles = StyleSheet.create({
    loading:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
});


class Loading extends  Component{
 // 构造
   constructor(props) {
     super(props);
     // 初始状态
     this.state = {};
   }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color="#3f51b5" size="large" />
                <Text>
                    正在加载数据...
                </Text>
            </View>
        );
}
}

module.exports = Loading;