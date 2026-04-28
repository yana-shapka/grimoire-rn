import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native';

const COLORS = {
  background: '#F7F2FA',
  placeholder: '#AAAAAA',
  text: '#1F2024',
  icon: '#6750A4',
};

const SearchBar = ({ placeholder = 'Search...', onChangeText }) => {
  const [query, setQuery] = useState('');

  const handleChange = (text) => {
    setQuery(text);
    if (onChangeText) onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⊕</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        value={query}
        onChangeText={handleChange}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  icon: {
    fontSize: 20,
    color: COLORS.icon,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
});

export default SearchBar;