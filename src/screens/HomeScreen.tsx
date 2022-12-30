import React from 'react';
import { Home } from '../pages'

const HomeScreen = ({ navigation, route }) => {
  return (
    <Home goToAdd={() =>{ navigation.navigate('AddExpenses',{item:null})}} 
          goToEdit={(item) =>{ navigation.navigate('AddExpenses',{item:item})}}  />
  )
}
export default HomeScreen;