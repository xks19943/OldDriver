/**
 * Created by liaoye on 2016/12/21.
 */
import React,{Component} from 'react';
import {
    ActivityIndicator,
    View,
    Text,
} from 'react-native';

export default class MoreView extends Component{
    render(){
        return(
            <View
                style={{flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', padding:8}}>
                <ActivityIndicator size={'large'} color={'#3f51b5'} />
                <Text style={{ textAlign: 'center', fontSize: 16, marginLeft: 8}}>
                    加载更多……
                </Text>
            </View>
        );
    }
}