import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from "../../common/Color";
import Banner from "../../component/Banner";
import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
const adUnitId = 'ca-app-pub-5751638294565515/8172882991';

const Slash = (props) => {

  const insets = useSafeAreaInsets()
  const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
  });


  useEffect(() => {
    setTimeout(() => {
      props.goToMyTabs()
    }, 5000)
      const unsubscribe = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
       // setLoaded(true);
        appOpenAd.show()
      });
      // Start loading the interstitial straight away
      appOpenAd.load();
      // Unsubscribe from events on unmount
      return unsubscribe;

  }, []);



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.white }}>
      <Image source={require('../../images/ic_app.png')} style={{ width: 150, height: 110 }} />
      <Text style={{ marginTop: 15, color: Color.pink, fontSize: 20 }}>Money Lover</Text>
      <Banner />
      <View style={{ position: 'absolute', bottom: 0, marginBottom: insets.bottom }}>
        <Text style={{ fontStyle: 'italic', fontSize: 10 }}>A product of Minh Trần</Text>
      </View>
    </View>
  )
}

export default Slash;