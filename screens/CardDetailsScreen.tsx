import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Badge from '../components/Badge';
import ManaColor from '../components/ManaColor';
import CustomButton from '../components/CustomButton';
import { fetchCardById } from '../api';

const COLORS = {
  text: '#1A1A1A',
  textSecondary: '#666666',
  background: '#FFFFFF',
  border: '#F0EEF8',
  error: '#D3202A',
  primary: '#6750A4',
};

/**
 * CardDetailsScreen — екран деталей картки.
 * Отримує базові дані картки через route.params.card,
 * але також завантажує повні деталі через API за card.id.
 *
 * Обробляє випадок коли card не передано —
 * показує екран помилки з кнопкою повернення.
 */
const CardDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const initialCard = route.params?.card;
  console.log('card colors:', initialCard?.colors);

  // Починаємо з даних переданих через navigate,
  // потім оновлюємо повними даними з API
  const [card, setCard] = useState(initialCard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(initialCard?.isFavorite || false);

  /**
   * loadCardDetails — завантажує повні деталі картки за id.
   * Викликається при монтуванні якщо є initialCard.id.
   */
  const loadCardDetails = async () => {
    if (!initialCard?.id) return;

    try {
      setLoading(true);
      setError(null);
      const fullCard = await fetchCardById(initialCard.id);
      setCard(fullCard);
      setIsFavorite(fullCard.isFavorite || false);
    } catch (err) {
      console.error('CardDetailsScreen error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCardDetails();
  }, []);

  // Обробка помилки — якщо card не передано взагалі
  if (!initialCard) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Card not found</Text>
          <Text style={styles.errorSubtitle}>
            No card data was provided.{'\n'}Please go back and try again.
          </Text>
          <CustomButton
            title="Go Back"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {card?.imageUrl ? (
          <Image
            source={{ uri: card.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>No image</Text>
          </View>
        )}

        <View style={styles.info}>

  
          {loading && (
            <ActivityIndicator
              size="small"
              color={COLORS.primary}
              style={styles.loader}
            />
          )}

          <Text style={styles.description}>
            {card?.description || 'No description available.'}
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Type</Text>
            <Badge label={card?.type || 'UNKNOWN'} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Rarity</Text>
            <Badge label={card?.rarity || 'COMMON'} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Color</Text>
            <ManaColor colors={card?.colors || ['COLORLESS']} />
          </View>

        </View>
      </ScrollView>


      <View style={styles.buttonContainer}>
        <CustomButton
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onPress={() => setIsFavorite(!isFavorite)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.error,
  },
  errorSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 320,
    marginTop: 16,
  },
  imagePlaceholder: {
    width: '100%',
    height: 320,
    marginTop: 16,
    backgroundColor: '#F0EEF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  info: {
    padding: 20,
    gap: 16,
  },
  loader: {
    alignSelf: 'center',
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    width: 60,
  },
  buttonContainer: {
    padding: 16,
    ...Platform.select({
      ios: { paddingBottom: 32 },
      android: { paddingBottom: 16 },
    }),
  },
});

export default CardDetailsScreen;