
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    Image,
} from 'react-native';


var styles = StyleSheet.create({
    container: {
        // marginTop:65,
        marginBottom: 0,
        flex: 1
    },
    empty: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
});

export default  class Empty extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }

    render() {
        var url = 'http://120.24.87.173:39241/0a27f4a5eade89f4e24d84dc7c2e1d73';
        var customUrl = this.props.emptyImageUrl;
        if (typeof(customUrl) != "undefined") {
            url = customUrl;
        }
        var txt = this.props.emptyTxt;
        if (txt == null || txt == "") {
            txt = "翻车了,雅美蝶!!!!";
        }
        return (
            <View style={styles.empty}>
                <Image style={styles.emptyImage}
                       source={{uri: url}}/>
                <Text style={{fontSize:18, marginTop:10, textAlign:'center'}}>
                    {txt}
                </Text>
            </View>
        )
    }
}