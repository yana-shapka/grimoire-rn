import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import CardGrid from '../components/CardGrid';

/**
 * FavoritesScreen — екран улюблених карток.
 * Відображає картки у grid-форматі (як Home і Search).
 * Клік на картку → CardDetailsScreen.
 * Видалення з улюблених і нотатки — на екрані деталей картки.
 */
const FavoritesScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Отримуємо список улюблених з Redux store
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Favorites</Text>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet.</Text>
          <Text style={styles.emptySubtext}>
            Open any card and tap "Add to favorites".
          </Text>
        </View>
      ) : (
        <CardGrid
          cards={favorites}
          onCardPress={(card) => navigation.navigate('CardDetails', { card })}
        />
      )}
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FavoritesScreen;