import React from "react";
import { StyleSheet } from 'react-native'
import Color from "../../common/Color";


const style = StyleSheet.create({
  container: {
    backgroundColor: Color.blue,
    flex: 1,
  },
  container2: {
    backgroundColor: 'white',
    flex: 1,
  },
  textUnit:{
    textDecorationLine:'underline'
  },
  textPrice:{
    marginTop:5,
    textAlign:'right',
    fontSize:16
  },
  text2: {
    marginLeft: 10,
    color:'balck',
    fontWeight:"bold",
    fontSize:20
  },
})

export default style