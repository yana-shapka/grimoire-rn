import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store/store';
import { addFavorite, removeFavorite, toggleFavoriteNote } from '../store/favoritesSlice';
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
  primaryLight: '#EDE9FF',
};

/**
 * CardDetailsScreen — екран деталей картки.
 *
 * Redux інтеграція:
 *   - useSelector — перевіряє чи картка в улюблених, читає поточну нотатку
 *   - addFavorite / removeFavorite — додати або видалити з улюблених
 *   - toggleFavoriteNote — зберегти нотатку (update операція)
 *
 * Поле нотатки відображається тільки якщо картка в улюблених.
 */
const CardDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const initialCard = route.params?.card;
  console.log('initialCard.id:', initialCard?.id);

  const [card, setCard] = useState(initialCard);
  const [loading, setLoading] = useState(false);

  // Перевіряємо статус улюбленої і поточну нотатку з Redux store
  const favoriteItem = useSelector((state: RootState) =>
    state.favorites.items.find(item => item.id === initialCard?.id)
  );
  const isFavorite = !!favoriteItem;

  // Локальний стан нотатки для поля вводу
  const [note, setNote] = useState(favoriteItem?.note ?? '');

  // Синхронізуємо нотатку якщо змінився favoriteItem
  useEffect(() => {
    setNote(favoriteItem?.note ?? '');
  }, [favoriteItem?.note]);

  const loadCardDetails = async () => {
    if (!initialCard?.id) return;
    try {
      setLoading(true);
      const fullCard = await fetchCardById(initialCard.id);
      setCard(fullCard);
    } catch (err) {
      console.error('CardDetailsScreen error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCardDetails();
  }, []);

  const handleAddFavorite = () => {
    if (!card) return;
    dispatch(addFavorite({
      id: card.id,
      name: card.name,
      imageUrl: card.imageUrl ?? null,
      type: card.type,
      rarity: card.rarity,
      colors: card.colors,
      description: card.description,
    }));
  };

  const handleRemoveFavorite = () => {
    if (!card) return;
    dispatch(removeFavorite(card.id));
  };

  const handleSaveNote = () => {
    if (!card) return;
    dispatch(toggleFavoriteNote({ id: card.id, note }));
  };

  // Помилка — картка не передана через route.params
  if (!initialCard) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Card not found</Text>
          <Text style={styles.errorSubtitle}>
            No card data was provided.{'\n'}Please go back and try again.
          </Text>
          <CustomButton title="Go Back" onPress={() => navigation.goBack()} />
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
            <ActivityIndicator size="small" color={COLORS.primary} style={styles.loader} />
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

        {/* Поле нотатки — відображається тільки якщо картка в улюблених */}
        {isFavorite && (
          <View style={styles.noteSection}>
            <Text style={styles.noteLabel}>My note</Text>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="Add a personal note..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
            />
            <TouchableOpacity
              style={styles.saveNoteButton}
              onPress={handleSaveNote}
              activeOpacity={0.7}
            >
              <Text style={styles.saveNoteText}>Save note</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* Кнопки додавання / видалення з улюблених */}
      <View style={styles.buttonContainer}>
        {isFavorite ? (
          <CustomButton
            title="Remove from favorites"
            onPress={handleRemoveFavorite}
          />
        ) : (
          <CustomButton
            title="Add to favorites"
            onPress={handleAddFavorite}
          />
        )}
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
  noteSection: {
    padding: 20,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  noteLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveNoteButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
  },
  saveNoteText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
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