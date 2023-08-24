import React from "react";
import { StyleSheet } from 'react-native'
import Color from "../../common/Color";


const style = StyleSheet.create({
  container: {
    backgroundColor: '#50a1e3',
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
  text2: {
    marginHorizontal: 5,
    marginTop: 5,
    color: 'balck',
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