import React from 'react';
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';
import Spinner from "react-native-spinkit";

function LoadingSpinner(props) {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <Spinner
        // style={styles.spinner}
        isVisible={true} size={50}
        type={'Bounce'} color={"blue"}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.title || 'Wait ...'}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: "blue",
  }
});

export default LoadingSpinner;
