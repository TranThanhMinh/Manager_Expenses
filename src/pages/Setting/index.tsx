import React, { useState, useContext } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import style from './style';
import * as Icon from "react-native-feather"
import { Color } from '../../common';
import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColors, ThemeContext } from '@hooks'
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
  const { colors } = useTheme()


  const list = [
    {
      name: t('text.language'),
      icon: Icon.Globe,
      action: () => setVisibleLanguage(true),
      id: 'language'
    },
    {
      name: t('text.theme'),
      icon: Icon.Moon,
      action: () => setVisibleColor(true),
      id: 'theme'
    },
    {
      name: t('text.comment'),
      icon: Icon.Heart,
      action: () => changeLanguge(),
      id: 'comment'
    },
    {
      name: t('text.contact'),
      icon: Icon.Inbox,
      action: () => changeLanguge(),
      id: 'contact'
    },
  ]

  function changeTheme() {
    return (
      <Modal isVisible={visibleColor}>
        <View style={style.dialog}>
          <Text style={style.title}>{t('title.theme')}</Text>

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


  function changeLanguge() {
    return (
      <Modal isVisible={visibleLanguage}>
        <View style={style.dialog}>
          <Text style={style.title}>{t('change_languge')}</Text>

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

  const handleEN = async () => {
    global.multilanguge = 'en'
    saveLanguge(global.multilanguge)
    setVisibleLanguage(false)
    i18n.changeLanguage(global.multilanguge)

    let language = await AsyncStorage.getItem("language");
    console.log('language', language)
  };

  const handleVN = () => {
    global.multilanguge = 'vi';
    saveLanguge(global.multilanguge)
    i18n.changeLanguage(global.multilanguge)
    setVisibleLanguage(false)
  };


  const saveLanguge = (language) => {
    try {
      AsyncStorage.setItem("language", language);
    } catch (error) {

    }
  }

  const Item = ({ item, index }) => {
    const { name, icon, action } = item
    const ItemIcon = icon
    const firstItem = index == 0
    const lastItem = index == list.length - 1
    return (
      <TouchableOpacity activeOpacity={0.7} key={index} style={[{ backgroundColor: colors.viewBackground, marginVertical: 4 },
      firstItem && { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
      lastItem && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}
        onPress={item.action}>
        <View style={style.item}>
          <View style={[style.bgIcon, { backgroundColor: colors.background }]}>
            <ItemIcon strokeWidth={1} stroke={Color.blue} />
          </View>
          <View style={style.bgName}>
            <Text style={[style.text, { color: colors.title }]}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (

    <View style={[style.container]}>
      <View style={[style.container2, { marginTop: insets.top, backgroundColor: colors.background }]}>
      <View style={{ flexDirection: 'row', padding: 10, backgroundColor: Color.blue, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={style.text2}>{t('text.setting')}</Text>
        </View>
        {/* <Text style={[style.textTitle, { color: colors.title }]}>{t('text.setting')}</Text> */}
        <FlatList
          data={list}
          style={style.bgList}
          renderItem={Item}/>
        {changeLanguge()}
        {changeTheme()}
      </View>

    </View>

  )
}
export default Setting;