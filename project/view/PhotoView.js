/**
 * Created by liaoye on 2017/2/5.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../util/Utils';
export default class PhotoView extends Component{

    render(){
        return(
            <Modal visible={true}
                   transparent={true}
                    onRequestClose={()=>{
                    }}>
                <ImageViewer
                    imageUrls={this.props.images}/>

                <TouchableOpacity
                    style={{height:44, width:44, borderRadius:22, backgroundColor:'#666666',
                    justifyContent:'center', alignItems:'center', position:'absolute',left:16,top:16}}
                                  onPress={()=>Utils.naviGoBack(this.props.navigator)}>
                    <Icon style={{fontSize:32,color:'#ffffff'}}
                          name ={'angle-left'}/>
                </TouchableOpacity>
            </Modal>
        )
    }
}