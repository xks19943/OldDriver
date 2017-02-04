/**
 * Created by liaoye on 2016/10/8.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    ListView,
    RefreshControl,
    StyleSheet,
    Dimensions,
    InteractionManager,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    PixelRatio
} from 'react-native';

import {
    navTintColor,
    titleTintColor,
    accentColor
} from '../constants/global-constants';

import StatusBars from '../component/StatusBars';
import Empty from '../component/Empty';
import Loading from '../component/Loading';
import EnomarModel from '../model/EnomarModel';
import DetailView from './DetailView';

import NavigationBar from 'react-native-navbar';
import MoreView from '../component/MoreView';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let canLoadMore;
let size;
export default class Home extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        canLoadMore = false;
        size = 0;
        this.state = {
            page:1,
            dataList:[],
            isLoadMore:false,
            isRefreshing:false,
            isLoading:true,
            empty:true,
            dataSource:ds,
        }
        this.renderItem = this.renderItem.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.renderMore = this.renderMore.bind(this);
    }

    componentDidMount() {
        let weakThis = this;
        InteractionManager.runAfterInteractions(function () {
            weakThis.onRefresh();
        });
    }

    toDetail(url){
        let weakThis = this;
        InteractionManager.runAfterInteractions(function () {
            weakThis.props.navigator && weakThis.props.navigator.push({
                component:DetailView,
                params:{
                    url:url,
                }
            });
        })
    }

    onScroll(){
        if(!canLoadMore && size == 10){
            canLoadMore = true;
        }
    }

    onRefresh(){
        if(this.state.isRefreshing){
            return;
        }
        this.setState({isRefreshing:true});
        let weakThis = this;
        EnomarModel.firstPage(1).then((data)=>{
            console.log('美女图片',data);
            if(data !=null && data.length > 0){
                size = data.length;
                weakThis.setState({
                    isLoading:false,
                    empty:false,
                    isRefreshing:false,
                    page:1,
                    dataList:data,
                    dataSource:weakThis.state.dataSource.cloneWithRows(data)
                })
            }else{
                weakThis.setState({
                    isLoading:false,
                    empty:true,
                    isRefreshing:false
                })
            }
        }).catch((e)=>{

        });
    }

    onLoadMore() {
        if (this.state.isRefreshing || this.state.isLoadMore || !canLoadMore) {
            return
        }
        this.setState({isLoadMore: true});
        let page = this.state.page;
        let weakThis = this;
        EnomarModel.nextPage(page + 1).then((data)=>{
            canLoadMore = false;
            if (data != null && data.length > 0) {
                let newList = this.state.dataList.concat(data);
                size = data.length;
                weakThis.setState({
                    isLoadMore: false,
                    page: page + 1,
                    dataList: newList,
                    dataSource: weakThis.state.dataSource.cloneWithRows(newList)
                })
            } else {
                weakThis.setState({
                    isLoadMore:false
                })
            }
        }).catch((e)=> {

        })
    }


    renderItem(rowData){
        return(
            <TouchableOpacity style={{marginBottom:10/PixelRatio.get()}} onPress={this.toDetail.bind(this,rowData.url)}>
                <Image source={{uri:rowData.picUrl}} style={styles.image} resizeMode={'stretch'}>
                    <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
                    <Text style={styles.desc} numberOfLines={1}>{rowData.description}</Text>
                    <Text style={styles.desc} numberOfLines={1}>{rowData.ctime}</Text>
                </Image>
            </TouchableOpacity>
        );
    }

    renderMore(){
        if(this.state.isLoadMore){
            return <MoreView/>
        }
        return null;
    }

    render(){
        var titleConfig = {
            title: '老司机',
            tintColor:titleTintColor,
            style:{fontSize:20}
        };
        if(this.state.isLoading){
            return(
                <View style={{flex:1, backgroundColor:'#efeff4'}}>
                    <StatusBars/>
                    <Loading/>
                </View>
            );
        }

        if(this.state.empty){
            return(
                <View style={{flex:1, backgroundColor:'#efeff4'}}>
                    <StatusBars/>
                    <Empty/>
                </View>
            );
        }

        return(
            <View style={{flex:1, backgroundColor:'#efeff4'}}>
                <StatusBars/>
                <NavigationBar tintColor={navTintColor}
                               title={titleConfig}
                               style={{height:56}}/>
                <ListView
                    style={[{flex:1}]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    renderFooter={this.renderMore}
                    onEndReached={this.onLoadMore}
                    onScroll={this.onScroll}
                    onEndReachedThreshold={10}
                    refreshControl={
                        <RefreshControl
                            style={{backgroundColor: 'transparent'}}
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            colors={[accentColor, accentColor, accentColor, accentColor]}/>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image:{
        height:height/3,
        width:width,
        flexDirection:'column',
        justifyContent:'flex-end',
    },
    title:{
        fontSize:16,
        color:'#fff',
        fontWeight:'bold',
        marginHorizontal:10,
        marginBottom:5
    },
    desc:{
        fontSize:12,
        color:'#fff',
        marginHorizontal:10,
        marginBottom:5
    }
})