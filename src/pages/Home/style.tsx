import React from "react";
import { StyleSheet } from "react-native";
import { Color } from "../../common";

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.blue,
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
  textNoTransaction: {
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: Color.gray2
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
  textUnit: {
    textDecorationLine: 'underline'
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
    paddingHorizontal: 10,
    marginHorizontal: 5
  },
  button: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.blue,
    width: 150,
    marginHorizontal: 5,
    borderRadius: 5
  },
  borderCalendar :{
    backgroundColor: 'white',
    borderRadius:10
  },
  buttonLangagueVN: {
    flex: 1,
    padding: 20,
    borderEndWidth:0.2,
    borderTopWidth:0.2,
  },
  buttonLangagueEN: {
    flex: 1,
    padding: 20,
    borderTopWidth:0.2,
    borderSatrtWidth:0.2
  },
  textLangague: {
    textAlign: 'center',
  },
  itemExpenses: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    marginHorizontal: 5,
    marginTop: 5,
  },
  text2: {
    marginHorizontal: 5,
    marginTop: 5,
    color: 'balck',
    fontWeight: "bold",
    fontSize: 16
  },
  textDate: {
    fontWeight: 'bold', color: Color.black, fontSize: 16
  },
  textFromDate: {
    fontWeight: 'bold', color: Color.blue, fontSize: 16, marginHorizontal: 5
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: Color.blue,
    paddingVertical: 20,
    fontWeight: 'bold'
  },

  borderBalance: {
    backgroundColor: Color.white,
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 10
  },

  textBalance: {
    color: Color.black,
    fontSize: 16,
    marginHorizontal: 10
  },

  textPrice: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },

  textHistory: {
    width: '100%',
    marginHorizontal: 5,
    textAlign: 'center',
    color: Color.white,
    fontWeight: "bold",
    fontSize: 20
  },

  borderSearch: {
    width: '50%',
    height: 40,
    
    borderRadius: 5,
    borderColor: '#444',
    textAlign:'left',
    borderWidth: 0.5,
    fontSize: 16,
    paddingHorizontal: 10
  },
  dropdown1BtnStyle: {
    width: '50%',
    height: 40,
    borderBottomWidth: 0.5,
    marginVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
  },
  dropdown1BtnStyleFalse: {
    width: '50%',
    height: 40,
    borderWidth: 0.5,
    marginVertical: 5,
    borderRadius: 5,
    borderColor:'#444',
    paddingHorizontal: 0,
    marginRight: 5,
    backgroundColor: Color.white,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  dropdown1BtnTxtStyle: { color: Color.gray2, textAlign: 'center', fontSize: 16 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle2: { color: 'black', textAlign: 'center', fontSize: 16, marginHorizontal: 5 },
  dropdown1RowTxtStyle: { color: 'black', textAlign: 'center', fontSize: 16, marginHorizontal: 5 },
  dropdown1RowTxtStyleTitle: { color: 'black', textAlign: 'center', fontSize: 16, marginHorizontal: 5, fontWeight: 'bold' },

})

export default style;