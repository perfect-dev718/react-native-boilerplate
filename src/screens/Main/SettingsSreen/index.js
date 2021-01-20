import {Text, View} from 'react-native';
import * as React from 'react';
import {Button} from 'react-native-elements';
import {signOut, useAuthDispatch} from '../../../context/AuthContext';
import BaseView from '../../../components/BaseView';

function SettingsScreen() {

  const authDispatch = useAuthDispatch();

  return (
    <BaseView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button
        title="SignOut"
        onPress={() => signOut(authDispatch)}
      />
    </BaseView>
  );
}

export default SettingsScreen;
