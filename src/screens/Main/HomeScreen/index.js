import {Text, View} from 'react-native';
import * as React from 'react';
import BaseView from '../../../components/BaseView';

function HomeScreen() {
  return (
    <BaseView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </BaseView>
  );
}

export default HomeScreen;
