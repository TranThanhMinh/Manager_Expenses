import React, {useState,useContext} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import style from './style';
import * as Icon from "react-native-feather"
import { Color } from '../../common';
import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useColors,ThemeContext} from '@hooks'
import { useTheme } from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Setting = ({ navigation, route }) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets();
  const [visibleLanguage, setVisibleLanguage] = useState(false)
  const [visibleTheme, setVisibleTheme] = useState(false)
  const themeContext = useContext(ThemeContext)
  const { theme, setTheme } = useColors({ themeName: 'Light' })
  const [visibleColor, setVisibleColor] = useState(false);
  const {colors} = useTheme()

  function changeLanguge() {
    return (
      <Modal isVisible={visibleLanguage}>
        <View  style={style.dialog}>
          <Text style={style.title}>{t('change_languge')}</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={style.buttonLangagueVN} onPress={colorDark}>
              <Text style={style.textLangague}>{t('dark')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonLangagueEN} onPress={colorLight}>
              <Text style={style.textLangague}>{t('light')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

    
  function changeTheme() {
    return (
      <Modal isVisible={visibleColor}>
        <View style={style.dialog}>
          <Text style={style.title}>{t('title.theme')}</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={style.buttonLangagueVN} onPress={handleVN}>
              <Text style={style.textLangague}>{t('vietnam')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonLangagueEN} onPress={handleEN}>
              <Text style={style.textLangague}>{t('english')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  const colorDark = () => {
    saveColor('Dark')
    
  }
  

  const colorLight = () => {
    saveColor('Light')
   
  }

  const saveColor = (color) => {
    try {
      AsyncStorage.setItem("color", color);
      setTheme(color)
      themeContext.toggleTheme()
    } catch (error) {
      console.log("color error 2")
    }
    setVisibleColor(false)
  }

  const handleEN = () => {
    global.multilanguge = 'en'
    setVisibleLanguage(false)
    i18n.changeLanguage(global.multilanguge)
  };

  const handleVN = () => {
    global.multilanguge = 'vi';
    i18n.changeLanguage(global.multilanguge)
    setVisibleLanguage(false)
  };

  return (

    <View style={[style.container,{backgroundColor:colors.background}]}>
      <View style={[style.container2, { marginTop: insets.top }]}>
        <Text>{t('text.setting')}</Text>
        <View style={style.item}>
          <Icon.Airplay stroke={Color.blue} />
          <TouchableOpacity onPress={()=>setVisibleLanguage(true)}>
            <Text>{t('text.language')}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.item}>
          <Icon.Airplay stroke={Color.blue} />
          <TouchableOpacity onPress={()=>setVisibleColor(true)} >
            <Text>{t('text.theme')}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.item}>
          <Icon.Airplay stroke={Color.blue} />
          <TouchableOpacity >
            <Text>{t('text.comment')}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.item}>
          <Icon.Airplay stroke={Color.blue} />
          <TouchableOpacity >
            <Text>{t('text.contact')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {changeLanguge()}
      {changeTheme()}
    </View>

  )
}
export default Setting;