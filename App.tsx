import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';

import CustomButton from './components/CustomButton';
import Badge from './components/Badge';
import CustomInput from './components/TextInput';
import SearchBar from './components/SearchBar';
import TabBar from './components/TabBar';
import CardItem from './components/CardItem';
import CardDetails from './components/CardDetails';
import ManaColor from './components/ManaColor';
import FilterRow from './components/FilterRow';
import FilterCounter from './components/FilterCounter';
import PaginationDots from './components/PaginationDots';
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

const SECTION = ({ title }: { title: string }) => (
  <Text style={styles.section}>{title}</Text>
);

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
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
      <ScrollView contentContainerStyle={styles.content}>
        <SECTION title="CustomButton" />
        <CustomButton title="Login" onPress={() => {}} />
        <CustomButton title="Disabled" onPress={() => {}} disabled />

        <SECTION title="Badge" />
        <View style={styles.row}>
          <Badge label="CREATURE" />
          <Badge label="COMMON" />
          <Badge label="BLACK" />
        </View>

        <SECTION title="CustomInput" />
        <CustomInput placeholder="Email Address" />
        <CustomInput placeholder="Password" secureText={true} />

        <SECTION title="SearchBar" />
        <SearchBar placeholder="Search cards..." />

        <SECTION title="ManaColor" />
        <ManaColor colors={['RED', 'GREEN', 'BLUE']} />

        <SECTION title="FilterCounter" />
        <FilterCounter count={3} />

        <SECTION title="FilterRow" />
        <FilterRow label="Type" count={1} />
        <FilterRow label="Color" count={0}>
          <Badge label="BLACK" />
          <Badge label="RED" />
        </FilterRow>

        <SECTION title="PaginationDots" />
        <PaginationDots total={3} active={0} />

        <SECTION title="UserAvatar" />
        <UserAvatar onEditPress={() => {}} />

        <SECTION title="CardItem (натисни щоб побачити CardDetails)" />
        <CardItem
          imageUrl={MOCK_CARD.imageUrl}
          onPress={() => setSelectedCard(MOCK_CARD)}
          numColumns={1}
        />
      </ScrollView>
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
  content: {
    padding: 20,
    gap: 12,
  },
  section: {
    fontSize: 13,
    fontWeight: '600',
    color: '#AAAAAA',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default App;