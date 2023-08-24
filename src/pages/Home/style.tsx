import React from "react";
import { StyleSheet } from "react-native";
import { Color } from "../../common";

const style = StyleSheet.create({
  container: {
    backgroundColor: '#50a1e3',
    flex: 1,
  },
  container2: {
    backgroundColor: Color.gray,
    flex: 1,
  },
  list: {
    color: '#FFF',
  },
  btnText: {
    color: '#FFF',
  },
  textNoTransaction:{
    textAlign:'center',
    alignItems:'center',
    alignContent:'center',
    color:Color.gray2
  },

  rowFront: {
    backgroundColor: 'white',
    height: 60,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  textUnit:{
    textDecorationLine:'underline'
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  closeBtn: {
    backgroundColor: 'blue',
    right: 75,
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
  },
  textInput: {
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal:10,
    marginHorizontal:5
  },
  button: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#50a1e3',
    width:150,
    marginHorizontal:5,
    borderRadius: 5
  },
  itemExpenses: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  text: {
    marginHorizontal: 5,
    marginTop:5,
  },
  text2: {
    marginHorizontal: 5,
    marginTop:5,
    color:'balck',
    fontWeight:"bold",
    fontSize:16
  },

  borderBalance:{
    backgroundColor: Color.white,
    marginVertical:10,
    padding:5
  },

  textBalance:{
    fontWeight:'bold',
    color:Color.black,
    fontSize:16,
    marginHorizontal:10
  },

  textPrice:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20,
  },

  textHistory: {
    width:'100%',
    marginHorizontal: 5,
    textAlign:'center',
    marginTop:5,
    color:Color.white,
    fontWeight:"bold",
    fontSize:20
  },

  borderSearch:{
    flex:1,
    height:35,
    borderRadius: 5,
    borderColor :'#444',
    borderWidth:0.5,
    paddingHorizontal:10
  },
  dropdown1BtnStyle: {
    width:150,
    height: 35,
    borderBottomWidth: 0.5,
    marginVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
  },
  dropdown1BtnStyleFalse: {
    width:150,
    height: 35,
    borderWidth:0.5,
    marginVertical: 5,
    borderRadius:5,
    paddingHorizontal: 0,
    marginHorizontal: 5,
    backgroundColor: '#FFF',

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'center',fontSize:14 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle2: { color: 'black', textAlign: 'center', fontSize:16,marginHorizontal:5},
  dropdown1RowTxtStyle: { color: 'black', textAlign: 'center', fontSize:16,marginHorizontal:5},
  dropdown1RowTxtStyleTitle: { color: 'black', textAlign: 'center', fontSize:16,marginHorizontal:5,fontWeight:'bold'},

})

export default style;