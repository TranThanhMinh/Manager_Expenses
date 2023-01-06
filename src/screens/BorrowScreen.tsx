import React from 'react';
import { Borrow } from '../pages'

const BorrowScreen = ({ navigation, route }) => {
  return (
    <Borrow goToHistory={(item) =>{ navigation.navigate('History',{id:item})}}/>
  )
}
export default BorrowScreen;