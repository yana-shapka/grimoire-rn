import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FilterCounter from './FilterCounter';

const COLORS = {
  text: '#1F2024',
  border: '#D4D6DD',
  arrow: '#6750A4',
};

const FilterRow = ({ label, count = 0, children = null }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.label}>{label}</Text>
        {count > 0
          ? <FilterCounter count={count} />
          : <Text style={styles.arrow}>{isExpanded ? '∧' : '∨'}</Text>
        }
      </TouchableOpacity>

      {isExpanded && children && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '400',
  },
  arrow: {
    fontSize: 16,
    color: COLORS.arrow,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 16,
  },
});

export default FilterRow;