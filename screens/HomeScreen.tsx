import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CardGrid from '../components/CardGrid';

const MOCK_CARDS = [
  {
    id: '1',
    name: 'Lightning Bolt',
    description: 'Lightning Bolt deals 3 damage to any target.',
    type: 'INSTANT',
    rarity: 'COMMON',
    colors: ['RED'],
    isFavorite: false,
    imageUrl: 'https://cards.scryfall.io/normal/front/e/3/e3285e6b-3e79-4d7c-bf96-d920f973b122.jpg',
  },
  {
    id: '2',
    name: 'Arbor Elf',
    description: 'Untap target Forest.',
    type: 'CREATURE',
    rarity: 'COMMON',
    colors: ['GREEN'],
    isFavorite: false,
    imageUrl: 'https://cards.scryfall.io/normal/front/6/e/6ebc66c2-cd85-4124-bba0-fb4cb769ca3b.jpg',
  },
  {
    id: '3',
    name: 'Ancestral Recall',
    description: 'Target player draws three cards.',
    type: 'INSTANT',
    rarity: 'RARE',
    colors: ['BLUE'],
    isFavorite: false,
    imageUrl: 'https://cards.scryfall.io/normal/front/2/e/2e4e2dd0-b3bc-4b50-96d1-9b5a7b41c7ee.jpg',
  },
  {
    id: '4',
    name: 'Reanimate',
    description: 'Put target creature card from a graveyard onto the battlefield.',
    type: 'SORCERY',
    rarity: 'UNCOMMON',
    colors: ['BLACK'],
    isFavorite: false,
    imageUrl: 'https://cards.scryfall.io/normal/front/a/0/a07a2585-a0f7-4148-a8b3-593a6a4c0c16.jpg',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Cards of the day</Text>
      <CardGrid
        cards={MOCK_CARDS}
        onCardPress={(card) => navigation.navigate('CardDetails', { card })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    padding: 16,
  },
});

export default HomeScreen;