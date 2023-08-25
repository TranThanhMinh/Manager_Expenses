import React from "react";
import { StyleSheet } from 'react-native'
import Color from "../../common/Color";


const style = StyleSheet.create({
  container: {
    backgroundColor: Color.blue,
    flex: 1,
  },
  container2: {
    backgroundColor: Color.gray,
    flex: 1,
  },
  textPrice: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
  textUnit:{
    textDecorationLine:'underline'
  },
  text:{
    fontSize:18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor:Color.white,
    marginTop:8,
  },
  borderCalendar :{
    backgroundColor: 'white',
    borderRadius:10,
  },
  textDate:{
    fontWeight: 'bold', color: Color.black ,fontSize:16
  },
  textFromDate:{
    fontWeight: 'bold', color: Color.blue ,fontSize:16,marginHorizontal:5
  },
  text2: {
    marginHorizontal: 5,
    color: Color.white,
    fontWeight: "bold",
    fontSize: 20
  },
  detailinfo: {
    width: 120,
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  textdetail: {
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  textPrive:{
    fontWeight: 'bold', textAlign: 'center'
  }
})

export default style