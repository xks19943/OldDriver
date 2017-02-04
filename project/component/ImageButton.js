/**
 * Created by liaoye on 2016/11/17.
 */
import React,{Component} from 'react';
import {
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    accentColor,
    titleTintColor
} from '../constants/global-constants';

export default class ImageButton extends Component{
    render(){
        return(
            <Icon.Button name={this.props.name} backgroundColor={accentColor}>
               <Text style={{fontSize: 16, color:titleTintColor}}>{this.props.text}</Text>
            </Icon.Button>
        );
    }
}