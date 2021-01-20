/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/context/AuthContext';
import RootContainer from './src/navigators/RootContainer';

const App: () => React$Node = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <RootContainer/>
    </AuthProvider>
  );
};

export default App;
