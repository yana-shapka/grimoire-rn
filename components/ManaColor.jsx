import React from 'react';
import { View, StyleSheet } from 'react-native';

const MANA_COLORS = {
  WHITE: '#F9FAF4',
  BLUE: '#0E68AB',
  BLACK: '#150B00',
  RED: '#D3202A',
  GREEN: '#00733E',
  COLORLESS: '#AAAAAA',
};

const BORDER_COLOR = '#E0E0E0';

const ManaColor = ({ colors = [] }) => {
  return (
    <View style={styles.container}>
      {colors.map((color, index) => {
        const overlapStyle = index > 0 ? styles.overlap : null;
        return (
          <View
            key={color}
            style={[
              styles.circle,
              { backgroundColor: MANA_COLORS[color] || MANA_COLORS.COLORLESS },
              overlapStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: BORDER_COLOR,
  },
  overlap: {
    marginLeft: -8,
  },
});

export default ManaColor;