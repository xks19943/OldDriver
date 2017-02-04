/**
 * Created by liaoye on 2016/11/4.
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    WebView,
    Dimensions
} from 'react-native';
import {
    navTintColor,
    titleTintColor,
    bgColor,
    textPrimaryColor,
    accentColor
} from '../constants/global-constants';

import NavigationBar from 'react-native-navbar';
const {width,height} = Dimensions.get('window');
import Utils from '../util/Utils';
import StatusBars from '../component/StatusBars';
import IconButton from '../component/IconButton';


export default class DetailView extends Component{
    constructor(props){
        super(props);
        this.state={
            url:''
        }
    }

    componentDidMount() {
        this.setState({url:this.props.url});
    }



    render(){
        var titleConfig = {
            title: '小姐姐',
            tintColor:titleTintColor,
            style:{fontSize:20}
        };

        return(
            <View style={{flex:1, backgroundColor:'#efeff4'}}>
                <StatusBars/>
                <NavigationBar tintColor={navTintColor}
                               title={titleConfig}
                               style={{height:56}}
                               leftButton={<IconButton onPress={()=>Utils.naviGoBack(this.props.navigator)}/>}
                />
                <WebView
                    style={{flex:1}}
                    startInLoadingState={true}
                    source={{uri:this.state.url}}
                    javaScriptEnabled={true}
                    //scalesPageToFit={true}
                    //automaticallyAdjustContentInsets={false}
                    //contentInset={{top:0,left:0, bottom:10,right:10}}
                />
            </View>
        );
    }
}