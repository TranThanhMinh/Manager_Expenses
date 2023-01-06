import React from 'react';
import { Home } from '../pages'

const HomeScreen = ({ navigation, route }) => {
  return (
    <Home goToAdd={(item) =>{ navigation.navigate('AddExpenses',{item:item})}} 
          goToEdit={(item) =>{ navigation.navigate('AddExpenses',{item:item})}}  />
  )
}
export default HomeScreen;