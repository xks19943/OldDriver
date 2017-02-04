/**
 * Created by liaoye on 2016/8/16.
 */
import React,{Component} from 'react';
import {
    StatusBar,
} from 'react-native';
import {
    statusBarColor,
} from '../constants/global-constants';

export default class StatusBars extends Component{

    render(){
        return(
            <StatusBar
                barStyle={'light-content'}
                animated={true}
                backgroundColor={statusBarColor}/>
        );
    }
}