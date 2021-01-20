import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SignInScreen from '../screens/Auth/SignInScreen';
import {useAuthDispatch, useAuthState} from '../context/AuthContext';

const INITIAL_ROUTE_NAME = 'SignIn';

const Stack = createStackNavigator();

export default function AuthNavigator({navigation, route}) {

    const authDispatch = useAuthDispatch();
    const authState = useAuthState();

    console.log('authState ===> ', authState)

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME} headerMode="none">
                {/*<Stack.Screen name="LandingScreen" component={LandingScreen}/>*/}
                <Stack.Screen name="SignIn" component={SignInScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
