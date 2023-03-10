import * as React from 'react';
import { Image, } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import BorrowScreen from './screens/BorrowScreen';
import AddExpensesScreen from './screens/AddExpensesScreen';
import HistoryScreen from './screens/HistoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SlashScreen from './screens/SlashScreen';
import ReportScreen from './screens/ReportScreen';

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const defaultOptions = {
  headerStyle: { backgroundColor: '#00B0FF' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
}

const MyTabs = () => {
  return (
    <Tab.Navigator
  
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? require('./images/ic_expenses.png')
              : require('./images/ic_expenses_2.png');
          } 
          else  if (route.name === 'Borrow') {
            iconName = focused
              ? require('./images/real-estate_2.png')
              : require('./images/real-estate.png');
          }
          else {
            iconName = focused
              ? require('./images/ic_report.png')
              : require('./images/ic_report_2.png');
          }
          return <Image source={iconName} style={{ width: 24, height: 24 }} />
        },
        tabBarActiveTintColor: '#50a1e3',
        tabBarInactiveTintColor: '#444',
        headerShown: false
      })} >
      <Tab.Screen name="Home" component={HomeScreen}  options={{ title: "Giao dịc hàng ngày" }}/>
      <Tab.Screen name="Borrow" component={BorrowScreen}  options={{ title: "Cho vay - Đi vay" }}/>
      <Tab.Screen name="Report" component={ReportScreen}  options={{ title: "Báo cáo" }}/>
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShown: false,
          ...defaultOptions,
        }}>
        <stack.Screen name="Slash" component={SlashScreen}  />
        <stack.Screen name="MyTabs" component={MyTabs}  />
        <stack.Screen name="AddExpenses" options={{ title: 'Thêm Chi tiêu hàng ngày' }} component={AddExpensesScreen} />
        <stack.Screen name="History" options={{ title: 'Danh sách lịch sử' }} component={HistoryScreen} />
      </stack.Navigator>

    </NavigationContainer>
  );
};
export default Router;