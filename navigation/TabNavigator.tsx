import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import SearchDrawerNavigator from './SearchDrawerNavigator';
import FavoritesScreen from '../screens/FavoritesScreen';
import AccountScreen from '../screens/AccountScreen';

export const SCREENS = {
  HOME: 'Home',
  SEARCH: 'Search',
  FAVORITES: 'Favorites',
  ACCOUNT: 'Account',
};

const COLORS = {
  active: '#6750A4',
  inactive: '#AAAAAA',
  background: '#F7F2FA',
  border: '#F0EEF8',
};

const TABS = [
  { name: SCREENS.HOME, icon: '⊞' },
  { name: SCREENS.SEARCH, icon: '⊕' },
  { name: SCREENS.FAVORITES, icon: '♡' },
  { name: SCREENS.ACCOUNT, icon: '⊙' },
];

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => {
          const tab = TABS.find(t => t.name === route.name);
          return (
            <Text style={[styles.icon, { color }]}>
              {tab?.icon}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.SEARCH} component={SearchDrawerNavigator} />
      <Tab.Screen name={SCREENS.FAVORITES} component={FavoritesScreen} />
      <Tab.Screen name={SCREENS.ACCOUNT} component={AccountScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingBottom: 24,
    paddingTop: 12,
    height: 80,
  },
  icon: {
    fontSize: 24,
  },
});

export default TabNavigator;