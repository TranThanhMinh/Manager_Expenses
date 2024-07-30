import React, { useEffect, useState, useContext,useRef } from 'react';
import { Image, AppState, View, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import BorrowScreen from './screens/BorrowScreen';
import AddExpensesScreen from './screens/AddExpensesScreen';
import HistoryScreen from './screens/HistoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SlashScreen from './screens/SlashScreen';
import ReportScreen from './screens/ReportScreen';
import SettingScreen from './screens/SettingScreen';
import { String } from '@common';
import { useColors, ThemeContext } from '@hooks'
import ButtonAdd from './component/ButtonAdd';
import * as Icon from "react-native-feather"
import './common/i18n'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { useTheme } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from './common/Color';
import { updateWallet, addWallet, getListwalletDefault } from "./data/WalletServices";
import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
const adUnitId = 'ca-app-pub-5751638294565515/8172882991';
const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const defaultOptions = {
  headerStyle: { backgroundColor: '#00B0FF' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
}

const MyTabs = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [multilanguge, setMultilanguge] = useState('vn')
  global.multilanguge = multilanguge
  const { colors } = useTheme()
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState([]);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
  });
  setTimeout(() => {
    setLoading(true)
  }, 1500);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
                const unsubscribe = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
          // setLoaded(true);
           appOpenAd.show()
         });
         // Start loading the interstitial straight away
         appOpenAd.load();
         // Unsubscribe from events on unmount
         return unsubscribe;
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });
    
    return () => {
      subscription.remove();
    };
  }, []);



  function showLoading() {
    return (
      <View style={{ backgroundColor: 'white', position: 'absolute', alignItems: 'center', width: '100%', height: '100%' }}>

      </View>

    )
  }

  return (
    <View style={{
      width: '100%',
      height: '100%'
    }}>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = require('./images/home.png')
              // ? require('./images/ic_expenses.png')
              // : require('./images/ic_expenses_2.png');
            }
            else if (route.name === 'Borrow') {
              iconName = require('./images/real-estate_2.png')
              // ? require('./images/real-estate_2.png')
              // : require('./images/real-estate.png');
            } else if (route.name === 'Report') {
              iconName = require('./images/report.png')
              // ? require('./images/real-estate_2.png')
              // : require('./images/real-estate.png');
            }
            else {
              iconName = require('./images/ic_setting.png')
              // ? require('./images/ic_report.png')
              // : require('./images/ic_report_2.png');
            }
            return <Image source={iconName} style={{ width: 25, height: 25, tintColor: color }} />
          },
          tabBarActiveTintColor: Color.blue,
          tabBarInactiveTintColor: '#444',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.viewBackground
          }

        })} >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('tab_1') }} />
        <Tab.Screen name="Borrow" component={BorrowScreen} options={{ title: t('tab_2') }} />
        <Tab.Screen name="Report" component={ReportScreen} options={{ title: t('tab_3') }} />
        <Tab.Screen name="Setting" component={SettingScreen} options={{ title: t('tab_4') }} />
      </Tab.Navigator>


      {
        !loading ?
          showLoading() :
          null}

      <View style={{ position: 'absolute', bottom: 80, right: 30 }}>
        <ButtonAdd addExpenses = {() => navigation.navigate('AddExpenses', { item: { wallet: null, add: true } })}/>
      </View>
    </View>

  );
}

const Router = () => {
  const themeContext = useContext(ThemeContext)

  useEffect(() => {
    themeContext.toggleTheme()
    getLanguge()

  }, [])



  const getLanguge = async () => {
    let language = await AsyncStorage.getItem("language");
    try {
      if (language === null)
        i18n.changeLanguage('en')
      else
        i18n.changeLanguage(language)
    }
    catch (error) {
      language = 'en'
      i18n.changeLanguage(language)
    }
  }

  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShown: false,
          ...defaultOptions,
        }}>
        <stack.Screen name="Slash" component={SlashScreen}  />
        <stack.Screen name="MyTabs" component={MyTabs} />
        <stack.Screen name="AddExpenses" options={{ title: 'Thêm Chi tiêu hàng ngày' }} component={AddExpensesScreen} />
        <stack.Screen name="History" options={{ title: 'Danh sách lịch sử' }} component={HistoryScreen} />
      </stack.Navigator>

    </NavigationContainer>
  );
};
export default Router;