import React from "react";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 35,
    borderColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10
  },
  itemExpenses: {
    flexDirection: 'row',
  },
  text: {
    marginHorizontal: 5,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 35,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
})

export default style;