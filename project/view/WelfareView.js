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
    PixelRatio
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
import {PullList} from 'react-native-pull';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let size;
export default class WelfareView extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        size = 0;
        this.state = {
            page:1,
            dataList:[],
            isLoadMore:false,
            isLoading:true,
            empty:true,
            dataSource:ds,
        }
        this.renderItem = this.renderItem.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.renderMore = this.renderMore.bind(this);
        this.onPullRelease = this.onPullRelease.bind(this);
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

    onPullRelease(resolve) {
        this.onRefresh();
        setTimeout(() => {
            resolve();
        }, 1000);
    }



    onRefresh(){
        let weakThis = this;
        EnomarModel.firstPage(1).then((data)=>{
            console.log('美女图片',data);
            if(data !=null && data.length > 0){
                size = data.length;
                weakThis.setState({
                    isLoading:false,
                    empty:false,
                    page:1,
                    dataList:data,
                    dataSource:weakThis.state.dataSource.cloneWithRows(data)
                })
            }else{
                weakThis.setState({
                    isLoading:false,
                    empty:true,
                })
            }
        }).catch((e)=>{

        });
    }

    onLoadMore() {
        if (this.state.isLoadMore && size!=10) {
            return
        }
        this.setState({isLoadMore: true});
        let page = this.state.page;
        let weakThis = this;
        EnomarModel.nextPage(page + 1).then((data)=>{
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
                    renderFooter={this.renderMore}
                    onEndReached={this.onLoadMore}
                    scrollEnabled={true}
                    onEndReachedThreshold={10}
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