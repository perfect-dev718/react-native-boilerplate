import React from 'react';
import {Icon} from 'react-native-elements';
import {SafeAreaView, Text} from 'react-native';

export default function NoData() {

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="inbox" type="antdesign" size={64}/>
      <Text>No Data</Text>
    </SafeAreaView>
  )
}
