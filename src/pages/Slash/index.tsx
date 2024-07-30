import React, { useEffect, useState, } from "react";
import { View, Text, Image, BackHandler, Button, TouchableOpacity } from "react-native";
import RNExitApp from 'react-native-exit-app';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from "../../common/Color";
import Banner from "../../component/Banner";
import { useNetInfo } from "@react-native-community/netinfo";
import Modal from "react-native-modal";
import { useTranslation, initReactI18next } from "react-i18next";
import * as Progress from 'react-native-progress';
import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
const adUnitId = 'ca-app-pub-5751638294565515/8172882991';


const Slash = (props) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
  });

  const { type, isConnected } = useNetInfo();

  useEffect(() => {
    if (isConnected)
      setTimeout(() => {
        props.goToMyTabs()
      }, 5000)
    // const unsubscribe = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
    //   // setLoaded(true);
    //   appOpenAd.show()
    // });
    // // Start loading the interstitial straight away
    // appOpenAd.load();
    // // Unsubscribe from events on unmount
    // return unsubscribe;
  }, [isConnected]);




  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.white }}>
      <Image source={require('../../images/ic_app.png')} style={{ width: 120, height: 120 }} />
      {/* <Text style={{ marginTop: 5, color: Color.pink, fontSize: 15 }}>Money Lover</Text> */}
      <Banner />
      <View style={{ position: 'absolute', bottom: 10, marginBottom: insets.bottom,alignItems:'center' }}>
        <Progress.Bar progress={0.3} width={100} indeterminate={true} style={{marginBottom:10}} />
        <Text style={{ fontStyle: 'italic', fontSize: 10 }}>A product of Minh Trần</Text>
      </View>

      <Modal isVisible={!isConnected}>
        <View style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 10 }}>
          <Text style={{ marginTop: 5, color: '#ED5D52', fontSize: 15, fontWeight: 'bold' }}>{t('text.network')}</Text>
          <Text style={{ marginVertical: 5, color: '#ED5D52', fontSize: 18, fontWeight: 'bold' }}>{t('text.turnoffapp')}</Text>
          <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 5, marginBottom: 5, backgroundColor: '#ED5D52', borderRadius: 10 }} onPress={() => { RNExitApp.exitApp(); }}>
            <Text style={{ color: 'white' }}>{t('text.close')}</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  )
}

export default Slash;