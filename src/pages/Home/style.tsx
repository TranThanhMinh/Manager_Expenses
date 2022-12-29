import React from "react";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    color: '#FFF',
  },
  btnText: {
    color: '#FFF',
  },
  rowFront: {
    paddingVertical:5,
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
  },
  dropdown1BtnStyle: {
    width:'100%',
    marginTop:10,
    height: 35,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
  
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
})

export default style;