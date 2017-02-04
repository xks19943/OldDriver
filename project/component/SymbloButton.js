/**
 * Created by liaoye on 2016/11/3.
 */
/**
 * Created by zhangjunimust on 16/9/26.
 */
import React,{Component} from 'react'
import {View,Text,Alert, StyleSheet} from 'react-native'

var text=null;
export default class SymbloButton extends Component
{

    constructor(props)
    {
        super(props);
        text=this.props.text
    }
    render(){
        return(
            <View style={buttonStyle.button}>
                <Text style={buttonStyle.text}>{this.props.text}</Text>
            </View>
        );
    }


}

const buttonStyle=StyleSheet.create({
    button:{
        borderWidth:1,
        borderColor:'#000000',
        borderRadius:4,
        paddingLeft:10,
        paddingRight:10,
        marginTop:15
    },
    text:{
        color:'#000000',
        fontSize:16,
        paddingTop:6
    },
    hotSymbol:{
        color:'#000000',
        fontSize:18,
        marginTop:12,
        borderWidth:1,
        borderColor:'#000000'
    },
    allSymbolStyle:{
        marginTop:25,
        marginLeft:20,
        marginRight:20,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap'
    },

});



getSymbolName(names)
{
    var displaySymbols=[];
    for(var i=0;i<names.length;i++)
    {

        let name=names[i];
        var industryName=(
            <TouchableWithoutFeedback key={'dg'+i} onPress={()=>{Alert.alert(name)}}>
                <View style={{flexDirection:'row'}}>
                    <SymbloButton
                        text={names[i]}
                        style={{marginLeft:15,marginRight:10}}
                    />
                    <View style={{width:10}}/>
                </View>
            </TouchableWithoutFeedback>
        );

        displaySymbols.push(industryName);
    }

    return displaySymbols

}
