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
    ListView,
    RefreshControl
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
import PhotoView from './PhotoView';
let canLoadMore;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default class PureView extends Component{
    size = 0;
    page = 1;

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataList:[],
            isLoadMore:false,
            isLoading:true,
            empty:true,
            isRefreshing:false,
            dataSource:ds,
        }
        this.renderItem = this.renderItem.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.renderMore = this.renderMore.bind(this);
    }

    zoomPicture = (url) =>{
        var images = [];
        var image = {url:''};
        image.url = url;
        images.push(image);
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator && this.props.navigator.push({
                component:PhotoView,
                params:{
                    images:images
                }
            })
        })
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.onRefresh();
        })
    }


    onRefresh(){
        this.setState({isRefreshing:true});
        PureModel.firstPage(1).then((data)=>{
            if(data !=null && data.length > 0){
                this.size = data.length;
                this.page = 1;
                this.setState({
                    isLoading:false,
                    empty:false,
                    dataList:data,
                    isRefreshing:false,
                    dataSource:this.state.dataSource.cloneWithRows(data)
                })
            }else{
                this.setState({
                    isLoading:false,
                    isRefreshing:false,
                    empty:true,
                })
            }
        }).catch((e)=>{

        });
    }


    onLoadMore() {
        if (this.state.isLoadMore && this.size !=10) {
            return
        }
        this.setState({isLoadMore: true});
        PureModel.nextPage(this.page + 1).then((data)=>{
            if (data != null && data.length > 0) {
                let newList = this.state.dataList.concat(data);
                this.size = data.length;
                this.page ++;
                this.setState({
                    isLoadMore: false,
                    dataList: newList,
                    dataSource: this.state.dataSource.cloneWithRows(newList)
                })
            } else {
                this.setState({
                    isLoadMore:false
                })
            }
        }).catch((e)=> {

        })
    }





    renderItem(rowData){
        let publishedAt = rowData.publishedAt;
        let time;
        if(publishedAt!=null){
            time = Utils.formateTime(publishedAt);
        }
        return(
            <TouchableOpacity style={{marginBottom:10/PixelRatio.get()}} onPress={()=>this.zoomPicture(rowData.url)}>
                <Image source={{uri:rowData.url}} style={styles.image} resizeMode={'stretch'}>
                    <Text style={styles.title} numberOfLines={1}>{'标题'}</Text>
                    <Text style={styles.desc} numberOfLines={1}>{'描述'}</Text>
                    <Text style={styles.desc} numberOfLines={1}>{time}</Text>
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
                <ListView
                    style={{flex:1}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    renderFooter={this.renderMore}
                    onEndReached={this.onLoadMore}
                    onEndReachedThreshold={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            colors={[navTintColor]}
                            progressBackgroundColor="#ffffff"
                        />
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