import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Badge from './Badge';
import ManaColor from './ManaColor';
import CustomButton from './CustomButton';

const COLORS = {
  text: '#1F2024',
  textSecondary: '#71727A',
  background: '#FDFCFF',
  backButton: '#6750A4',
};

const CardDetails = ({ card, onBack }) => {
  const [isFavorite, setIsFavorite] = useState(card?.isFavorite || false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: card?.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.info}>
          <Text style={styles.name}>{card?.name}</Text>
          <Text style={styles.description}>{card?.description}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Type</Text>
            <Badge label={card?.type || 'CREATURE'} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Rarity</Text>
            <Badge label={card?.rarity || 'COMMON'} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Color</Text>
            <ManaColor colors={card?.colors || ['GREEN']} />
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
  backButton: {
    padding: 16,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 24,
    color: COLORS.backButton,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 320,
  },
  info: {
    padding: 20,
    gap: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
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
    borderBottomColor: '#F0EEF8',
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
      ios: {
        paddingBottom: 32,
      },
      android: {
        paddingBottom: 16,
      },
    }),
  },
});

export default CardDetails;