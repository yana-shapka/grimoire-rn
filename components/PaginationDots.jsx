import React from 'react';
import { View, StyleSheet } from 'react-native';

const COLORS = {
  active: '#6750A4',
  inactive: '#E0E0E0',
};

const PaginationDots = ({ total = 3, active = 0 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === active ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: COLORS.active,
  },
  dotInactive: {
    backgroundColor: COLORS.inactive,
  },
});

export default PaginationDots;