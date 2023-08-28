/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
import Router from './Router'
import { Provider } from 'react-redux';
import { store } from './redux/reducer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColors, ThemeContext } from '@hooks'
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
const App = () => {
  console.disableYellowBox = true
  const { theme, setTheme, themeName } = useColors({ themeName: 'Light' })

  const toggleTheme = async () => {
    const theme = await AsyncStorage.getItem("color");
    setTheme(theme)
  }

  const toggleLanguge = async () => {
    getLanguge()
  }

  const getLanguge = async () => {
    let language = await AsyncStorage.getItem("language");
    try {
      if(language === null)
      i18n.changeLanguage('vi')
      else
      i18n.changeLanguage(language)
    }
    catch (error) {
      console.log(error);
      language = 'vi'
      i18n.changeLanguage(language)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme: themeName, toggleTheme, toggleLanguge }}>
    <PaperProvider theme={theme} >
    <Provider store={store}>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </Provider>
    </PaperProvider>
    </ThemeContext.Provider>
  );
};


export default App;
