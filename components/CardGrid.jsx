import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import CardItem from './CardItem';

const SPACING = 16;
const GAP = 12;

const CardGrid = ({ cards = [], onCardPress }) => {
  const { width } = useWindowDimensions();
  const itemWidth = (width - SPACING * 2 - GAP) / 2;

  return (
    <FlatList
      style={styles.list}
      data={cards}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <CardItem
          name={item.name}
          imageUrl={item.imageUrl}
          onPress={() => onCardPress && onCardPress(item)}
          width={itemWidth}
        />
      )}
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