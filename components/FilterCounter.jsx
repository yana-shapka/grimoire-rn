import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORS = {
  background: '#6750A4',
  text: '#FFFFFF',
};

const FilterCounter = ({ count }) => {
  if (!count || count === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default FilterCounter;