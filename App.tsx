/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Router from './src/Router'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import {
  SafeAreaView,

} from 'react-native';


const App = () => {

  return (
    <Provider store={store}>
     <Router/>
     </Provider>
  );
};


export default App;
