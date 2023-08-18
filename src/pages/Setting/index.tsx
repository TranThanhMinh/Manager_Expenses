import React from 'react';
import { Text ,View } from 'react-native';
import style from './style';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Setting = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
  return (
     
     <View style={style.container}>
     <View style={[style.container2, { marginTop: insets.top }]}>
     <Text>Setting</Text>
        </View>
        </View>

  )
}
export default Setting;