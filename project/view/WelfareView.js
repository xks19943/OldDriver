/**
 * Created by liaoye on 2016/10/8.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    InteractionManager,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    PixelRatio,
    RefreshControl,
} from 'react-native';

import {
    navTintColor,
    titleTintColor,
    accentColor
} from '../constants/global-constants';

import Empty from '../component/Empty';
import Loading from '../component/Loading';
import EnomarModel from '../model/EnomarModel';
import DetailView from './DetailView';
import MoreView from '../component/MoreView';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default class WelfareView extends Component{
    size = 0;
    page = 1;

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataList:[],
            isRefreshing:false,
            isLoadMore:false,
            isLoading:true,
            empty:true,
            dataSource:ds,
        }
        this.renderItem = this.renderItem.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.renderMore = this.renderMore.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.onRefresh();
        });
    }

    toDetail(url){
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator && this.props.navigator.push({
                component:DetailView,
                params:{
                    url:url,
                }
            });
        })
    }




    onRefresh(){
        this.setState({isRefreshing:true});
        EnomarModel.firstPage(1).then((data)=>{
            console.log('美女图片',data);
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
                    empty:true,
                    isRefreshing:false,
                })
            }
        }).catch((e)=>{
            this.setState({
                isRefreshing:false,
            })
        });
    }

    onLoadMore() {
        if (this.state.isLoadMore && this.size!=10) {
            return
        }
        this.setState({isLoadMore: true});
        EnomarModel.nextPage(this.page + 1).then((data)=>{
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