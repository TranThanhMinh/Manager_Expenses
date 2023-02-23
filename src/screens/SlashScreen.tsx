import React from 'react';
import { Slash } from '../pages'

const SlashScreen = ({ navigation, route }) => {

  return (
    <Slash goToMyTabs={() => navigation.navigate('MyTabs')} />
  )
}
export default SlashScreen;