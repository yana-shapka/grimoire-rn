import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CardGrid from '../components/CardGrid';
import SearchBar from '../components/SearchBar';
import FilterCounter from '../components/FilterCounter';
import { openFilterDrawer } from '../navigation/SearchDrawerNavigator';
import { filterState } from './FilterScreen';

const COLORS = {
  primary: '#6750A4',
  text: '#1A1A1A',
  border: '#F0EEF8',
  background: '#FFFFFF',
};

const MOCK_CARDS = [
  {
    id: '1',
    name: 'Lightning Bolt',
    type: 'INSTANT',
    rarity: 'COMMON',
    colors: ['RED'],
    isFavorite: false,
    imageUrl: 'https://cards.scryfall.io/normal/front/e/3/e3285e6b-3e79-4d7c-bf96-d920f973b122.jpg',
  },
  {
    id: '2',
    name: 'Arbor Elf',
    type: 'CREATURE',
    rarity: 'COMMON',
    colors: ['GREEN'],
    isFavorite: false,
    imageUrl: 'https://cards.scryfall.io/normal/front/6/e/6ebc66c2-cd85-4124-bba0-fb4cb769ca3b.jpg',
  },
  {
    id: '3',
    name: 'Ancestral Recall',
    type: 'INSTANT',
    rarity: 'RARE',
    colors: ['BLUE'],
    isFavorite: false,
    imageUrl: 'https://cards.scryfall.io/normal/front/2/e/2e4e2dd0-b3bc-4b50-96d1-9b5a7b41c7ee.jpg',
  },
  {
    id: '4',
    name: 'Reanimate',
    type: 'SORCERY',
    rarity: 'UNCOMMON',
    colors: ['BLACK'],
    isFavorite: false,
    imageUrl: 'https://cards.scryfall.io/normal/front/a/0/a07a2585-a0f7-4148-a8b3-593a6a4c0c16.jpg',
  },
];

const SORT_OPTIONS = ['Name A→Z', 'Name Z→A', 'Rarity'];

const SearchScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [query, setQuery] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [, forceUpdate] = useState(0);

  const activeFilterCount =
    filterState.types.length +
    filterState.rarities.length +
    filterState.colors.length;

  const filteredCards = MOCK_CARDS
    .filter(card => card.name.toLowerCase().includes(query.toLowerCase()))
    .filter(card => filterState.types.length === 0 || filterState.types.includes(card.type))
    .filter(card => filterState.rarities.length === 0 || filterState.rarities.includes(card.rarity))
    .filter(card => filterState.colors.length === 0 || card.colors.some(c => filterState.colors.includes(c)))
    .sort((a, b) => {
      if (sortBy === 'Name A→Z') return a.name.localeCompare(b.name);
      if (sortBy === 'Name Z→A') return b.name.localeCompare(a.name);
      if (sortBy === 'Rarity') {
        const order = ['COMMON', 'UNCOMMON', 'RARE', 'MYTHIC'];
        return order.indexOf(a.rarity) - order.indexOf(b.rarity);
      }
      return 0;
    });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchContainer}>
        <SearchBar placeholder="Search cards..." onChangeText={setQuery} />
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setSortVisible(!sortVisible)}
          activeOpacity={0.7}
        >
          <Text style={styles.controlText}>⇅ Sort</Text>
          <Text style={styles.controlArrow}>∨</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            openFilterDrawer();
            forceUpdate(n => n + 1);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.controlText}>≡ Filter</Text>
          {activeFilterCount > 0 && <FilterCounter count={activeFilterCount} />}
        </TouchableOpacity>
      </View>

      {sortVisible && (
        <View style={styles.sortDropdown}>
          {SORT_OPTIONS.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.sortOption}
              onPress={() => {
                setSortBy(option === sortBy ? '' : option);
                setSortVisible(false);
              }}
            >
              <Text style={[styles.sortOptionText, sortBy === option && styles.sortOptionActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <CardGrid
        cards={filteredCards}
        onCardPress={(card) => navigation.navigate('CardDetails', { card })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  controlText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  controlArrow: {
    fontSize: 12,
    color: COLORS.primary,
  },
  sortDropdown: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sortOptionText: {
    fontSize: 15,
    color: COLORS.text,
  },
  sortOptionActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default SearchScreen;