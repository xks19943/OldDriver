/**
 * Created by liaoye on 2016/12/22.
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
import MoreView from '../component/MoreView';
import Empty from '../component/Empty';
import Loading from '../component/Loading';
import PureModel from '../model/PureModel';

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

    onRefresh(){
        this.setState({isRefreshing:true});
        let weakThis = this;
        PureModel.firstPage(1).then((data)=>{
            //console.log('成功之后',data);
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



    renderItem(rowData){
        return(
            <TouchableOpacity style={{marginBottom:10/PixelRatio.get()}}>
                <Image source={{uri:rowData.url}} style={styles.image} resizeMode={'stretch'}>
                    <Text style={styles.title} numberOfLines={1}>{'标题'}</Text>
                    <Text style={styles.desc} numberOfLines={1}>{'描述'}</Text>
                    <Text style={styles.desc} numberOfLines={1}>{'时间'}</Text>
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
            <ListView
                style={{flex:1}}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
                //renderFooter={this.renderMore}
                //onEndReached={this.onLoadMore}
                //onScroll={this.onScroll}
                //onEndReachedThreshold={10}
                refreshControl={
                    <RefreshControl
                        style={{backgroundColor: 'transparent'}}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                        colors={[accentColor, accentColor, accentColor, accentColor]}/>
                }
            />
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