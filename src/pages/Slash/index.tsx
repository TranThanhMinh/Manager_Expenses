import React,{useEffect} from "react";
import { View, Text, Image } from "react-native";

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Slash = (props) => {

    const insets = useSafeAreaInsets()
    
    useEffect(()=>{
      setTimeout(()=>{
        props.goToMyTabs()
      },3000)
    },[])
     
    return (
        <View style ={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:insets.bottom}}>
            <Image source={require('../../images/ic_app.png')} style ={{width:100,height:90}}/>
            <Text style={{marginTop:10, color:'#50a1e3',fontSize:18}}>Quản lý chi tiêu</Text>
            <View style ={{position:'absolute',bottom: 0}}>
                  <Text style={{fontStyle:'italic', fontSize:10}}>A product of Minh Trần</Text> 
            </View>
        </View>
    )
}

export default Slash;