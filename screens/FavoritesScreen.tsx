import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CardGrid from '../components/CardGrid';

const MOCK_FAVORITES = [
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
];

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Favorites</Text>
      <CardGrid
        cards={MOCK_FAVORITES}
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

export default FavoritesScreen;