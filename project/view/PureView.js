/**
 * Created by liaoye on 2016/12/22.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    InteractionManager,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    PixelRatio,
    ListView
} from 'react-native';

import {
    navTintColor,
    titleTintColor,
    accentColor
} from '../constants/global-constants';
import MoreView from '../component/MoreView';
import Empty from '../component/Empty';
import Loading from '../component/Loading';
import PureModel from '../model/PureModel';
import {PullList} from 'react-native-pull';
import Utils from '../util/Utils';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let canLoadMore;
let size;
export default class PureView extends Component{
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
        this.onPullRelease = this.onPullRelease.bind(this);
        //this.topIndicatorRender = this.topIndicatorRender.bind(this);
        //this.onLoadMore = this.onLoadMore.bind(this);
        //this.onScroll = this.onScroll.bind(this);
        //this.renderMore = this.renderMore.bind(this);
    }

    componentDidMount() {
        let weakThis = this;
        InteractionManager.runAfterInteractions(()=>{
            weakThis.onRefresh();
        })
    }

    onPullRelease(resolve) {
        this.onRefresh();
        setTimeout(() => {
            resolve();
        }, 1000);
    }

    onRefresh(){
        this.setState({isRefreshing:true});
        let weakThis = this;
        PureModel.firstPage(1).then((data)=>{
            console.log('成功之后',data);
            weakThis.setState({
                isLoading:false,
                empty:false,
                isRefreshing:false,
                page:1,
                dataList:data,
                dataSource:weakThis.state.dataSource.cloneWithRows(data)
            })
        }).catch((e)=>{

        });
    }

   /* topIndicatorRender(pulling, pullok, pullrelease) {
        return <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
            <ActivityIndicator size="small" color={accentColor} />
            {pulling ? <Text>下拉刷新...</Text> : null}
            {pullok ? <Text>松开刷新......</Text> : null}
            {pullrelease ? <Text style={{fontSize:16,color:accentColor}}>玩命刷新中......</Text> : null}
        </View>;
    }*/


    renderItem(rowData){
        let publishedAt = rowData.publishedAt;
        let time;
        if(publishedAt!=null){
            time = Utils.formateTime(publishedAt);
        }
        return(
            <TouchableOpacity style={{marginBottom:10/PixelRatio.get()}}>
                <Image source={{uri:rowData.url}} style={styles.image} resizeMode={'stretch'}>
                    <Text style={styles.title} numberOfLines={1}>{'标题'}</Text>
                    <Text style={styles.desc} numberOfLines={1}>{'描述'}</Text>
                    <Text style={styles.desc} numberOfLines={1}>{time}</Text>
                </Image>
            </TouchableOpacity>
        );
    }


    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex:1, backgroundColor:'#efeff4'}}>
                    <Loading/>
                </View>
            );
        }

        if(this.state.empty){
            return(
                <View style={{flex:1, backgroundColor:'#efeff4'}}>
                    <Empty/>
                </View>
            );
        }

        return(
            <View style={{flex:1}}>
                <PullList
                    style={{flex:1}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    //topIndicatorRender={this.topIndicatorRender}
                    topIndicatorHeight={60}
                    onPullRelease={this.onPullRelease}
                    //renderFooter={this.renderMore}
                    //onEndReached={this.onLoadMore}
                    //onScroll={this.onScroll}
                    //onEndReachedThreshold={10}
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