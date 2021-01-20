import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Main/HomeScreen';
import SettingsScreen from '../screens/Main/SettingsSreen';
import {Icon} from 'react-native-elements';
import {theme} from '../assets/theme';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: theme.black,
          inactiveTintColor: theme.gray_tone_3,
          // showLabel: false,
          tabBarColor: '#222f3e',
          /*style: {
            height: globalStyle.miniBarMargin,
            marginTop: dialogState.state === 1 ? globalStyle.miniBarHeight : 0,
          },*/
          tabStyle: {
            // height: 50,
            // backgroundColor: '#fff',
          },
        }}
        animationEnabled={true}
        swipeEnabled={true}
        shifting={true}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size, focused}) => (
              <Icon type={'font-awesome'}
                    name="home"
                    color={color}
                    // style={{opacity: focused ? 1 : 0.5}}
                    // size={focused ? 33 : 25}
              />
            ),
            tabBarColor: "grey",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color, size, focused}) => (
              <Icon type={'font-awesome'}
                    name="gear"
                    color={color}
                    // style={{opacity: focused ? 1 : 0.5}}
                    // size={focused ? 33 : 25}
              />
            ),
            tabBarColor: "grey",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
