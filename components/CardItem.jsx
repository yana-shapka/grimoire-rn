import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const CardItem = ({ imageUrl, onPress, numColumns = 2 }) => {
  const { width } = useWindowDimensions();

  const cardWidth = numColumns === 1 ? width - 32 : (width - 48) / 2;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
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