import React from "react";
import { StyleSheet } from "react-native";
import { Color } from "../../common";

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.blue,
    flex: 1,
  },
  container2: {
    backgroundColor: 'white',
    flex: 1,
  },
  body: {
    padding:10,
    margin:10
  },
  list: {
    color: '#FFF',
  },
  btnText: {
    color: '#FFF',
  },
  rowFront: {
    paddingVertical: 5,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
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
    flex:1,
    height:40,
    borderBottomWidth: 0.5,
    marginVertical: 5,
    paddingHorizontal: 10,
    fontSize:18,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
  },
  text2: {
    flex:1,
    height: 40,
    textAlignVertical:'center',
    color:'#000',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  text: {
    flex:1,
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor:'#C5C5C5',
    textAlignVertical:'center',
    color:'#000',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  btnAdd: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.blue,
    width:'50%',
    marginTop:10,
    borderRadius: 5,
    flexDirection:'row',
    height:40
  },

  btnUpdate: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.blue,
    width:'50%',
    borderRadius: 5,
    flexDirection:'row',
    height:40
  },

  btnDelete: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width:'50%',
    borderColor:'red',
    borderWidth:0.5,
    marginHorizontal: 5,
    borderRadius: 5,
    flexDirection:'row',
    height:40
  },
  itemExpenses: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  dropdown1BtnStyle: {
    flex:1,
    height: 35,
    borderBottomWidth: 0.5,
    marginVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 5,
    borderBottomColor:Color.gray2,
    backgroundColor: '#FFF',
  },
  dropdown1BtnStyleFalse: {
    flex:1,
    height: 35,
    borderBottomWidth: 0.5,
    borderColor:'#444',
    marginVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 5,
    backgroundColor: '#FFF',

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left',fontSize:18 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle2: { color: 'black', textAlign: 'left', fontSize:16,marginHorizontal:5},
  dropdown1RowTxtStyle: { color: 'black', textAlign: 'left', fontSize:18,marginHorizontal:5},
  dropdown1RowTxtStyleTitle: { color: 'black', textAlign: 'center', fontSize:18,marginHorizontal:5,fontWeight:'bold'},
  combobox: {
    flexDirection: 'row',
    width:'100%',
    alignItems: 'center',
  },
  button:{
    fontSize:20,
    marginLeft:5
  }
})

export default style;