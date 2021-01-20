import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {theme} from '../assets/theme';

export default function BaseView(props) {

  return (
    <SafeAreaView style={[styles.container, props.style]}>
      {props.children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  }
});
