/**
 * Created by liaoye on 2017/2/5.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class PhotoView extends Component{
    renderHeader(){
        return(
          <Text style={{fontSize:16, backgroundColor:'#ffffff'}}>{'返回'}</Text>
        );
    }

    render(){
        return(
            <Modal visible={true} transparent={true}>
                <ImageViewer
                    imageUrls={this.props.images}
                    renderHeader={this.renderHeader}/>
            </Modal>
        )
    }
}