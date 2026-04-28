import React from 'react';
import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import CardItem from './CardItem';

const MOCK_CARDS = [
  {
    id: '1',
    name: 'Lightning Bolt',
    imageUrl: 'https://cards.scryfall.io/normal/front/e/3/e3285e6b-3e79-4d7c-bf96-d920f973b122.jpg',
  },
  {
    id: '2',
    name: 'Arbor Elf',
    imageUrl: 'https://cards.scryfall.io/normal/front/6/e/6ebc66c2-cd85-4124-bba0-fb4cb769ca3b.jpg',
  },
  {
    id: '3',
    name: 'Ancestral Recall',
    imageUrl: 'https://cards.scryfall.io/normal/front/2/e/2e4e2dd0-b3bc-4b50-96d1-9b5a7b41c7ee.jpg',
  },
  {
    id: '4',
    name: 'Reanimate',
    imageUrl: 'https://cards.scryfall.io/normal/front/a/0/a07a2585-a0f7-4148-a8b3-593a6a4c0c16.jpg',
  },
];

const CardGrid = ({ cards = MOCK_CARDS, onCardPress }) => {
  const { width } = useWindowDimensions();

  const numColumns = width < 380 ? 1 : 2;

  return (
    <FlatList
      data={cards}
      keyExtractor={item => item.id}
      key={numColumns}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.row : null}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <CardItem
          name={item.name}
          imageUrl={item.imageUrl}
          numColumns={numColumns}
          onPress={() => onCardPress && onCardPress(item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default CardGrid;