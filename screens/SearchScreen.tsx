import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CardGrid from '../components/CardGrid';
import SearchBar from '../components/SearchBar';
import FilterCounter from '../components/FilterCounter';
import { openFilterDrawer } from '../navigation/SearchDrawerNavigator';
import { filterState } from './FilterScreen';
import { searchCards } from '../api';

const COLORS = {
  primary: '#6750A4',
  text: '#1A1A1A',
  textSecondary: '#666666',
  border: '#F0EEF8',
  background: '#FFFFFF',
  error: '#D3202A',
};

const SORT_OPTIONS = ['Name A→Z', 'Name Z→A', 'Rarity'];

/**
 * SearchScreen — екран пошуку карток.
 * При відкритті екрану список порожній.
 * Пошук відбувається тільки після натискання кнопки Search.
 * Підтримує фільтрацію через Drawer і сортування.
 * filterVersion — проп від SearchDrawerNavigator,
 * збільшується коли юзер натискає Apply Filters,
 * що викликає перерендер і застосування нових фільтрів.
 */
const SearchScreen = ({ filterVersion = 0 }: { filterVersion?: number }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    forceUpdate(n => n + 1);
  }, [filterVersion]);

  const handleChangeText = (text: string) => {
    setQuery(text);
  };

  /**
   * handleSubmit — викликається при натисканні кнопки Search.
   * Якщо запит порожній — нічого не робимо.
   * Якщо є текст — шукає за назвою через API.
   */
  const handleSubmit = async () => {
    if (query.trim().length === 0) return;

    try {
      setLoading(true);
      setError(null);
      const data = await searchCards(query.trim());
      setCards(data);
    } catch (err) {
      setError('Failed to load cards. Please try again.');
      console.error('SearchScreen error:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeFilterCount =
    filterState.types.length +
    filterState.rarities.length +
    filterState.colors.length;

  // Застосовуємо фільтри і сортування до завантажених карток
  const filteredCards = cards
    .filter(card => filterState.types.length === 0 || filterState.types.includes(card.type))
    .filter(card => filterState.rarities.length === 0 || filterState.rarities.includes(card.rarity))
    .filter(card => filterState.colors.length === 0 || card.colors.some(c => filterState.colors.includes(c)))
    .sort((a, b) => {
      if (sortBy === 'Name A→Z') return a.name.localeCompare(b.name);
      if (sortBy === 'Name Z→A') return b.name.localeCompare(a.name);
      if (sortBy === 'Rarity') {
        const order = ['MYTHIC', 'RARE', 'UNCOMMON', 'COMMON'];
        return order.indexOf(a.rarity) - order.indexOf(b.rarity);
      }
      return 0;
    });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search cards..."
          onChangeText={handleChangeText}
          onSubmit={handleSubmit}
        />
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
          onPress={() => openFilterDrawer()}
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

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      {error && !loading && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText} onPress={handleSubmit}>
            Tap to retry
          </Text>
        </View>
      )}

      {!loading && !error && cards.length === 0 && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Search for cards by name</Text>
        </View>
      )}

      {!loading && !error && filteredCards.length > 0 && (
        <CardGrid
          cards={filteredCards}
          onCardPress={(card) => navigation.navigate('CardDetails', { card })}
        />
      )}
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorText: {
    fontSize: 15,
    color: COLORS.error,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  retryText: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});

export default SearchScreen;