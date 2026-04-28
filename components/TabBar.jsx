import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

const COLORS = {
  active: '#6750A4',
  inactive: '#AAAAAA',
  background: '#F7F2FA',
  border: '#F0EEF8',
};

const TABS = [
  { id: 'home', icon: '⌂' },
  { id: 'search', icon: '⊚' },
  { id: 'favorites', icon: '♥' },
  { id: 'account', icon: '☻' },
];

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      {TABS.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => setActiveTab(tab.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.icon, activeTab === tab.id && styles.iconActive]}>
            {tab.icon}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: COLORS.inactive,
  },
  iconActive: {
    color: COLORS.active,
  },
});

export default TabBar;