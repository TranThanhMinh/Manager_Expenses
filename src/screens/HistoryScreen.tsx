import React from 'react';
import { History } from '../pages'

const HistoryScreen = ({ navigation, route }) => {
  const{id} = route.params
  return (
    <History goToBack={() => navigation.goBack()} id ={id}/>
  )
}
export default HistoryScreen;