import React, { useCallback } from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import CardItem from './CardItem';

const SPACING = 16;
const GAP = 12;

/**
 * CardGrid — грід карток на основі FlatList.
 *
 * Оптимізація (HW7 — завдання 3):
 *   renderItem стабілізовано через useCallback.
 *   item передається як окремий проп (не через стрілкову функцію) —
 *   це дозволяє CardItem мемоізувати handlePress через власний useCallback.
 *
 *   Без цього підходу: () => onCardPress?.(item) всередині renderItem
 *   створювала нову функцію при кожному рендері → memo на CardItem
 *   бачив новий onPress → перемальовував всі картки.
 *
 *   З цим підходом: onPress і item — стабільні референси →
 *   memo + useCallback в CardItem блокують зайві ре-рендери.
 */
const CardGrid = ({ cards = [], onCardPress }) => {
  const { width } = useWindowDimensions();
  const itemWidth = (width - SPACING * 2 - GAP) / 2;

  const renderItem = useCallback(({ item }) => (
    <CardItem
      imageUrl={item.imageUrl}
      item={item}
      onPress={onCardPress}
      width={itemWidth}
    />
  ), [onCardPress, itemWidth]);

  return (
    <FlatList
      style={styles.list}
      data={cards}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    padding: SPACING,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
});

export default CardGrid;