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
            url:'',
        }
    }

    componentWillMount() {
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
                    injectedJavaScript={
                        '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">'
                    }
                   /*onNavigationStateChange={(title)=>{
                        if(title.title != undefined) {
                            console.log('高度为',title);
                            this.setState({
                                height:(parseInt(title.title))
                            })
                        }
                    }}*/
                />
            </View>
        );
    }
}