import React, { memo, useCallback } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * CardItem — компонент однієї картки в гріді.
 *
 * Оптимізація (HW7 — завдання 3):
 *   React.memo — не перемальовує якщо пропси не змінились.
 *
 *   handlePress стабілізований через useCallback всередині компонента.
 *   Це вирішує проблему стрілкової функції в renderItem CardGrid —
 *   onPress і item приходять як окремі стабільні пропси,
 *   а handlePress мемоізується тут і не створюється заново при
 *   кожному рендері батька.
 *
 *   Результат: при відкритті Sort dropdown CardItem не перемальовується,
 *   бо його пропси (imageUrl, item, onPress, width) не змінились.
 */
const CardItem = memo(({ imageUrl, item, onPress, width }) => {

  const handlePress = useCallback(() => {
    onPress?.(item);
  }, [item, onPress]);

  return (
    <TouchableOpacity
      style={[styles.card, { width }]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
});

CardItem.displayName = 'CardItem';

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