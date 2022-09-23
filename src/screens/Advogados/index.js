/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ListAdv from './ListAdv';
import MapAdvTab from './MapAdvTab';
import {COLORS} from '../../assets/colors';

const Tab = createBottomTabNavigator();

const Advogados = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        initialRouteName: 'AdvogadosTab',
        tabBarActiveTintColor: COLORS.white,
        labelStyle: {
          height: 18,
          fontSize: 12,
          margin: 0,
          fontWeight: 'bold',
        },
        tabBarStyle: { backgroundColor: COLORS.primary },
        showIcon: true,
      }}>
      <Tab.Screen
        name="AdvogadosTab"
        component={ListAdv}
        options={{
          tabBarLabel: 'Advogados',
          title: false,
          tabBarIcon: () => (
            <Icon name="people" color={COLORS.white} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="AdvogadosMapTab"
        component={MapAdvTab}
        options={{
          tabBarLabel: 'Localização',
          title: false,
          tabBarIcon: () => (
            <Icon name="map" color={COLORS.white} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Advogados;