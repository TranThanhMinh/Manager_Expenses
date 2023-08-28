import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import style from './style';
import * as Icon from "react-native-feather"
import { Color } from '../../common';
import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import i18n from "i18next";

import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Setting = ({ navigation, route }) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets();
  const [visibleLanguage, setVisibleLanguage] = useState(false)

  
  function changeLanguge() {
    return (
      <Modal isVisible={visibleLanguage}>
        <View style={{ backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: Color.blue, paddingVertical: 20, fontWeight: 'bold' }}>{t('change_languge')}</Text>

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

    <View style={style.container}>
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
          <TouchableOpacity >
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
    </View>

  )
}
export default Setting;