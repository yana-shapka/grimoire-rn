import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilterCounter from '../components/FilterCounter';
import CustomButton from '../components/CustomButton';

// Android потребує явного увімкнення LayoutAnimation
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const COLORS = {
  primary: '#6750A4',
  primaryLight: '#EDE9FF',
  text: '#1A1A1A',
  border: '#F0EEF8',
  background: '#FFFFFF',
};

const TYPES = ['INSTANT', 'CREATURE', 'SORCERY', 'ENCHANTMENT'];
const RARITIES = ['COMMON', 'UNCOMMON', 'RARE', 'MYTHIC'];
const MANA_COLORS = ['BLACK', 'WHITE', 'GREEN', 'BLUE', 'RED'];

export const filterState = {
  types: [] as string[],
  rarities: [] as string[],
  colors: [] as string[],
};

const Chip = ({ label, selected, onPress }: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

/**
 * FilterSection — секція фільтрів з accordion-анімацією.
 *
 * Анімація реалізована через LayoutAnimation (HW7 — завдання 2).
 * При кожному відкритті/закритті викликається configureNext —
 * React Native автоматично анімує наступну зміну layout.
 *
 * Примітка: на Android з Fabric (New Architecture) анімація може не
 * спрацювати — це відома обмеженість LayoutAnimation на новій архітектурі.
 */
const FilterSection = ({ label, count, items, selected, onToggle }: {
  label: string;
  count: number;
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.8,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    setExpanded(prev => !prev);
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionLabel}>{label}</Text>
        {count > 0
          ? <FilterCounter count={count} />
          : <Text style={styles.arrow}>{expanded ? '∧' : '∨'}</Text>
        }
      </TouchableOpacity>

      {/* Блок чіпів з'являється/зникає з анімацією через LayoutAnimation */}
      {expanded && (
        <View style={styles.chips}>
          {items.map(item => (
            <Chip
              key={item}
              label={item}
              selected={selected.includes(item)}
              onPress={() => onToggle(item)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const FilterScreen = ({ onClose, onApply }: {
  onClose?: () => void;
  onApply?: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(filterState.types);
  const [selectedRarities, setSelectedRarities] = useState<string[]>(filterState.rarities);
  const [selectedColors, setSelectedColors] = useState<string[]>(filterState.colors);

  const toggle = (
    item: string,
    list: string[],
    setList: (l: string[]) => void,
    key: keyof typeof filterState,
  ) => {
    const next = list.includes(item)
      ? list.filter(i => i !== item)
      : [...list, item];
    setList(next);
    (filterState[key] as string[]) = next;
  };

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedRarities([]);
    setSelectedColors([]);
    filterState.types = [];
    filterState.rarities = [];
    filterState.colors = [];
  };

  const handleApply = () => {
    if (onApply) onApply();
    if (onClose) onClose();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.headerAction}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.headerAction}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        <FilterSection
          label="Type"
          count={selectedTypes.length}
          items={TYPES}
          selected={selectedTypes}
          onToggle={(item) => toggle(item, selectedTypes, setSelectedTypes, 'types')}
        />
        <FilterSection
          label="Rarity"
          count={selectedRarities.length}
          items={RARITIES}
          selected={selectedRarities}
          onToggle={(item) => toggle(item, selectedRarities, setSelectedRarities, 'rarities')}
        />
        <FilterSection
          label="Color"
          count={selectedColors.length}
          items={MANA_COLORS}
          selected={selectedColors}
          onToggle={(item) => toggle(item, selectedColors, setSelectedColors, 'colors')}
        />
      </ScrollView>

      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 16 }]}>
        <CustomButton
          title="Apply Filters"
          onPress={handleApply}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
  },
  headerAction: {
    fontSize: 15,
    color: COLORS.primary,
  },
  scroll: {
    flex: 1,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  sectionLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  arrow: {
    fontSize: 16,
    color: COLORS.primary,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  chipTextSelected: {
    color: COLORS.background,
  },
  buttonContainer: {
    padding: 16,
  },
});

export default FilterScreen;