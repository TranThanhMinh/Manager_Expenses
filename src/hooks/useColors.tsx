import React,{useState} from "react";
import {  DefaultTheme } from '@react-navigation/native';

const useColors =({ themeName })=>{
  
    const[theme,setTheme]= useState(themeName)

    const darkTheme = {
      ...DefaultTheme,
      roundness: 2,
      dark: true,
      colors: {
        background: '#202331',
        viewBackground: '#292D3E',
        title: '#FFFFFF',
        text: '#D7D7D9',
        textDetail: '#6D6D6D',
        colorf5767a: '#F5767A',
        colorA82920: '#A82920',
        color3C54F4: '#3C54F4',
        colorBlack: '#000000',
        colorTextBalance: '#6f6f6f',
        colorf7f7f7: '#f7f7f7',
        colore8f7f0: '#e8f7f0',
        colorf53134: '#f53134',
        color2fb575: '#2fb575',
        colorWhite: 'white',
      }
    }
  
    const lightTheme = {
      ...DefaultTheme,
      roundness: 2,
      dark: false,
      colors: {
        background: '#F2F3F7',
        viewBackground: '#FFFFFF',
        title: '#1F1F1F',
        text: '#313131',
        textDetail: '#D8D7DC',
        colorf5767a: '#F5767A',
        colorA82920: '#A82920',
        color3C54F4: '#3C54F4',
        colorBlack: '#000000',
        colorTextBalance: '#6f6f6f',
        colorf7f7f7: '#f7f7f7',
        colore8f7f0: '#e8f7f0',
        colorf53134: '#f53134',
        color2fb575: '#2fb575',
        colorWhite: 'white',
      }
    }
  
    return {
      theme: theme == 'Dark' ? darkTheme : lightTheme,
      themeName: theme,
      setTheme
    }
}

export default useColors;