import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Profile} from '../screens';
import Colors from '../assets/Colors';
import Icon from '../assets/Icon';
import HomeStacks from './Stacks/HomeStacks';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStacks"
        component={HomeStacks}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarActiveTintColor: Colors.lightGreen,
          tabBarInactiveTintColor: Colors.lightGray,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                type={'AntDesign'}
                name="home"
                size={28}
                color={focused ? Colors.lightGreen : Colors.lightGray}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.lightGreen,
          tabBarInactiveTintColor: Colors.lightGray,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                type={'Feather'}
                name="user"
                size={28}
                color={focused ? Colors.lightGreen : Colors.lightGray}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
