/**
 * Created by liaoye on 2016/8/22.
 */
import React,{Component} from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class IconButton extends Component{
    render(){
        let name;
        this.props.name == null ? name ='angle-left':name = this.props.name;
        return(
            <TouchableOpacity onPress={this.props.onPress} style={{marginHorizontal:16, alignSelf:'center'}}>
                <Icon name={name} color="#ffffff" size={32} style={{margin:8}}/>
            </TouchableOpacity>
        );
    }
}