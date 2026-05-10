import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CardGrid from '../components/CardGrid';
import { fetchCards } from '../api';

const COLORS = {
  primary: '#6750A4',
  text: '#1A1A1A',
  textSecondary: '#666666',
  background: '#FFFFFF',
  error: '#D3202A',
};

/**
 * HomeScreen — головний екран з картками дня.
 * Завантажує картки з MTG API при першому рендері.
 * Обробляє стани: завантаження, помилка, успіх.
 */
const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * loadCards — завантажує картки з API.
   * Викликається при монтуванні компонента через useEffect.
   */
  const loadCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCards(1, 20);
      setCards(data);
    } catch (err) {
      setError('Failed to load cards. Please try again.');
      console.error('HomeScreen error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Завантажуємо картки при першому рендері
  useEffect(() => {
    loadCards();
  }, []);

  if (loading) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading cards...</Text>
      </View>
    );
  }

  // Екран помилки з кнопкою повтору
  if (error) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={loadCards}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Cards of the day</Text>
      <CardGrid
        cards={cards}
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
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    padding: 16,
  },
  loadingText: {
    fontSize: 15,
    color: COLORS.textSecondary,
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
});

export default HomeScreen;