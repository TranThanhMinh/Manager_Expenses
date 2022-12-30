import React from 'react';
import { AddExpenses } from '../pages'

const AddExpensesScreen = ({ navigation, route }) => {
  const { item } = route.params
  return (
    <AddExpenses goToBack={() => navigation.goBack()}
      item={item} />
  )
}
export default AddExpensesScreen;