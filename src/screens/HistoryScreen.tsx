import React from 'react';
import { History } from '../pages'

const HistoryScreen = ({ navigation, route }) => {
  const{id} = route.params
  console.log(id)
  return (
    <History goToBack={() => navigation.goBack()} id ={id}/>
  )
}
export default HistoryScreen;