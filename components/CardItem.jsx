import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

const CardItem = ({ imageUrl, onPress, width }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { width }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 0.72,
  },
});

export default CardItem;