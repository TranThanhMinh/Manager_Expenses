import React,{useEffect} from "react";
import { View, Text, Image } from "react-native";

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from "../../common/Color";

const Slash = (props) => {

    const insets = useSafeAreaInsets()
    
    useEffect(()=>{
      setTimeout(()=>{
        props.goToMyTabs()
      },2000)
    },[])
     
    return (
        <View style ={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:Color.white}}>
            <Image source={require('../../images/ic_app.png')} style ={{width:150,height:110}}/>
            <Text style={{marginTop:15, color:Color.pink,fontSize:20}}>Money Lover</Text>
            {/* <View style ={{position:'absolute',bottom: 0,marginBottom:insets.bottom}}>
                  <Text style={{fontStyle:'italic', fontSize:10}}>A product of Minh Trần</Text> 
            </View> */}
        </View>
    )
}

export default Slash;