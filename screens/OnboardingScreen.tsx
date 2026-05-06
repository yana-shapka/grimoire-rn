import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomButton from '../components/CustomButton';
import PaginationDots from '../components/PaginationDots';

const COLORS = {
  text: '#1A1A1A',
  textSecondary: '#666666',
  background: '#F7F2FA',
};

const SLIDES = [
  {
    title: 'Manage your collection',
    subtitle: 'Track every card you own in one place',
  },
  {
    title: 'Build better decks',
    subtitle: 'Organize and optimize your playstyle',
  },
  {
    title: 'Trade with confidence',
    subtitle: 'Know the value of every card',
  },
];

const OnboardingScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLast = currentIndex === SLIDES.length - 1;
  const slide = SLIDES[currentIndex];

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </View>
      <PaginationDots total={SLIDES.length} active={currentIndex} />
      <View style={styles.buttonContainer}>
        <CustomButton
          title={isLast ? 'Get Started' : 'Next'}
          onPress={() => {
            if (isLast) {
              navigation.navigate('Login');
            } else {
              setCurrentIndex(i => i + 1);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default OnboardingScreen;