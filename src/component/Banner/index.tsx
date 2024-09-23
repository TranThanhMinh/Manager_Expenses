import React, { useState } from "react";
import { View } from "react-native";

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Banner =()=>{
  var unitId = "ca-app-pub-3940256099942544/6300978111"
 //const unitId ='ca-app-pub-5751638294565515/7484204003'
 const[isShow,setShow] = useState(false)
    return (
       <View>
        {  isShow?
            <BannerAd
            unitId={unitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdOpened={()=>setShow(true)}
            onAdLoaded={()=>setShow(true)}
            onAdFailedToLoad={()=>setShow(false)}
          />:<View></View>
        }
       </View>
      
    )
}
export default Banner;