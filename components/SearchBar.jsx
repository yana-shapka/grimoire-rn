import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const COLORS = {
  background: '#F7F2FA',
  placeholder: '#AAAAAA',
  text: '#1F2024',
  icon: '#6750A4',
};

const SearchBar = ({ placeholder = 'Search...', onChangeText, onSubmit }) => {
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
        onSubmitEditing={onSubmit}
      />
      {query.length > 0 && (
        <TouchableOpacity
          onPress={onSubmit}
          activeOpacity={0.7}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      )}
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
  searchButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.icon,
    borderRadius: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default SearchBar;