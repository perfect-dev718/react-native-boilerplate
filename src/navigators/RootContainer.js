import React, {useEffect} from 'react';
import AuthNavigator from './AuthNavigator';
import {tokenVerify, useAuthDispatch, useAuthState} from '../context/AuthContext';
import MainNavigator from './MainNavigator';
import LoadingSpinner from '../components/LoadingSpinner';
import {Provider} from 'react-redux';
import store from '../store';

function RootContainer() {

  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  console.log('authState ==> ', authState)

  useEffect(() => {
    tokenVerify(authDispatch)
  }, []);

  if(authState.tokenVerifying) return <LoadingSpinner title="loading"/>

  return (
    <Provider store={store}>
      {
        authState.isSignout ?
          <AuthNavigator/>
          :
          <MainNavigator/>
      }
    </Provider>
  );
}

export default RootContainer;
