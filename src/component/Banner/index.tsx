import React from "react";

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Banner =()=>{
  //var unitId = "ca-app-pub-3940256099942544/6300978111"
  const unitId ='ca-app-pub-5751638294565515/7484204003'
    return (
        <BannerAd
        unitId={unitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    )
}
export default Banner;