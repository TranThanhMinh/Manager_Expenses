import React from "react";
import { View, Image } from "react-native";

const ButtonAdd =()=>{
  return(
   <View>
      <Image source={require('../../images/ic_add.png')} style ={{width:40,height:40}}/>
   </View>
  )
}

export default ButtonAdd;