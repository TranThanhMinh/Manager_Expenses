/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Router from './Router'
import { Provider } from 'react-redux';
import { store } from './redux/reducer';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App = () => {
  console.disableYellowBox = true
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        
        <Router />
      </SafeAreaProvider>
    </Provider>
  );
};


export default App;
