import React from "react";
import { StyleSheet } from "react-native";
import Color from "../../common/Color";

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.blue,
    flex: 1,
  },
  container2: {
    backgroundColor: '#e1e1e1',
    flex: 1,
  },
  item: {
    flexDirection: 'row'
  },
  buttonLangagueVN: {
    flex: 1,
    padding: 20,
    borderEndWidth: 0.2,
    borderTopWidth: 0.2,
  },
  buttonLangagueEN: {
    flex: 1,
    padding: 20,
    borderTopWidth: 0.2,
    borderSatrtWidth: 0.2
  },
  textLangague: {
    textAlign: 'center'
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
  }
})
export default style