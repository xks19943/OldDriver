/**
 * Created by liaoye on 2016/12/22.
 */
import React,{Component} from 'react';
import {
    View,
    Text
} from 'react-native';

import StatusBars from '../component/StatusBars';
import IconButton from '../component/IconButton';
import Drawer from 'react-native-drawer';
import MenuView from './MenuView';
import NavigationBar from 'react-native-navbar';
import ScrollableTabView,{DefaultTabBar}from 'react-native-scrollable-tab-view';
import {
    navTintColor,
    titleTintColor,
    bgColor,
    textPrimaryColor,
    accentColor
} from '../constants/global-constants';
import PureView from '../view/PureView';

export default class MainView extends Component{

    render(){
        var titleConfig = {
            title: '老司机',
            tintColor:titleTintColor,
            style:{fontSize:20}
        };
        return(
            <View style={{flex:1, backgroundColor:'#efeff4'}}>
                <StatusBars/>
                <NavigationBar tintColor={navTintColor}
                               title={titleConfig}
                               style={{height:56}}
                               leftButton={<IconButton name={'bars'} onPress={this.props.onPress}/>}/>
                  <ScrollableTabView
                        style={{flex:1}}
                        initialPage={0}
                        tabBarPosition='top'
                        renderTabBar={()=><DefaultTabBar backgroundColor={navTintColor} textStyle={{fontSize:16}}
                                                         underlineStyle={{backgroundColor:titleTintColor}} activeTextColor={titleTintColor}
                                                         inactiveTextColor={titleTintColor}/>}
                        >
                        <PureView tabLabel="清纯"/>
                  </ScrollableTabView>
            </View>
        );
    }
}