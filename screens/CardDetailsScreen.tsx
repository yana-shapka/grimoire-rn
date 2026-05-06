import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Badge from '../components/Badge';
import ManaColor from '../components/ManaColor';
import CustomButton from '../components/CustomButton';

const COLORS = {
  text: '#1A1A1A',
  textSecondary: '#666666',
  background: '#FFFFFF',
  border: '#F0EEF8',
  error: '#D3202A',
};

/**
 * CardDetailsScreen — екран деталей картки.
 * Отримує дані картки через route.params.card
 * переданий з HomeScreen, SearchScreen або FavoritesScreen.
 *
 * Обробляє випадок коли card не передано —
 * показує екран помилки з кнопкою повернення.
 */
const CardDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const card = route.params?.card;

  const [isFavorite, setIsFavorite] = useState(card?.isFavorite || false);

  // Обробка помилки — якщо card не передано
  if (!card) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
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
        <Image
          source={{ uri: card.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.info}>
          <Text style={styles.description}>{card.description}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Type</Text>
            <Badge label={card.type || 'CREATURE'} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Rarity</Text>
            <Badge label={card.rarity || 'COMMON'} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Color</Text>
            <ManaColor colors={card.colors || ['GREEN']} />
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
    marginTop: 32,
  },
  info: {
    padding: 20,
    gap: 16,
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