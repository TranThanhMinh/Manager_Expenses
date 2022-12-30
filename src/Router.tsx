import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import AddExpensesScreen from './screens/AddExpensesScreen';

const stack = createNativeStackNavigator();
const defaultOptions = {
  headerStyle: { backgroundColor: '#00B0FF' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white'
}
const Router = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        ...defaultOptions,
      }}>
        <stack.Screen name="Home" options={{title:'Chi tiêu hàng ngày'}} component={HomeScreen} />
        <stack.Screen name="AddExpenses" options={{title:'Thêm Chi tiêu hàng ngày'}} component={AddExpensesScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;