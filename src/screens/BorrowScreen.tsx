import React from 'react';
import { Borrow } from '../pages'

const BorrowScreen = ({ navigation, route }) => {
  return (
    <Borrow goToAdd={() =>{ navigation.navigate('AddExpenses',{item:null})}} 
          goToEdit={(item) =>{ navigation.navigate('AddExpenses',{item:item})}}  />
  )
}
export default BorrowScreen;