import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Color from "../../common/Color";


const ButtonAdd = (props) => {
  return (

    <TouchableOpacity  onPress={props.addExpenses}
      style={{
        borderWidth: 1,
        borderColor:  Color.blue,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        position: 'absolute',
        right: 5,
        height: 50,
        backgroundColor: Color.blue,
        borderRadius: 100,
        bottom: 5
      }}>
      <Text style={{ color: "white" ,fontSize:30,top:-1,}}>+</Text>
    </TouchableOpacity>

  )
}

export default ButtonAdd;