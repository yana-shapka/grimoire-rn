import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import TabBar from './components/TabBar';
import CardGrid from './components/CardGrid';
import CardDetails from './components/CardDetails';
import FilterRow from './components/FilterRow';
import Badge from './components/Badge';
import UserAvatar from './components/UserAvatar';

const MOCK_CARD = {
  id: '1',
  name: 'Lightning Bolt',
  description: 'Lightning Bolt deals 3 damage to any target.',
  type: 'INSTANT',
  rarity: 'COMMON',
  colors: ['RED'],
  isFavorite: false,
  imageUrl: 'https://cards.scryfall.io/normal/front/e/3/e3285e6b-3e79-4d7c-bf96-d920f973b122.jpg',
};

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [selectedCard, setSelectedCard] = useState(null);

  if (selectedCard) {
    return (
      <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
        <CardDetails
          card={selectedCard}
          onBack={() => setSelectedCard(null)}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      {/* В landscape — горизонтальний layout */}
      <View style={[styles.main, isLandscape && styles.mainLandscape]}>
        <ScrollView style={isLandscape ? styles.sidePanel : styles.topPanel}>
          <UserAvatar onEditPress={() => console.log('edit pressed')} />
          <View style={styles.filters}>
            <FilterRow label="Type" count={1} />
            <FilterRow label="Rarity" count={0}>
              {null}
            </FilterRow>
            <FilterRow label="Color" count={1}>
              <Badge label="BLACK" />
              <Badge label="WHITE" />
              <Badge label="GREEN" />
              <Badge label="BLUE" />
              <Badge label="RED" />
            </FilterRow>
          </View>
        </ScrollView>

        <View style={styles.gridContainer}>
          <CardGrid onCardPress={() => setSelectedCard(MOCK_CARD)} />
        </View>
      </View>

      <TabBar />
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  // В landscape — фільтри зліва, картки справа
  mainLandscape: {
    flexDirection: 'row',
  },
  sidePanel: {
    width: 200,
    borderRightWidth: 1,
    borderRightColor: '#F0EEF8',
  },
  topPanel: {
    maxHeight: 200,
  },
  filters: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  gridContainer: {
    flex: 1,
  },
});

export default App;