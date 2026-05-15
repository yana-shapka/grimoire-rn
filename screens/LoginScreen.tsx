import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../context/AuthContext';
import CustomInput from '../components/TextInput';
import CustomButton from '../components/CustomButton';

const COLORS = {
  text: '#1A1A1A',
  textSecondary: '#666666',
  primary: '#6750A4',
  background: '#F7F2FA',
  error: '#D3202A',
};

// Мінімальна довжина пароля — відповідає валідації в AuthContext
const MIN_PASSWORD_LENGTH = 4;

/**
 * LoginScreen — екран авторизації.
 *
 * Викликає login() з AuthContext замість console.log.
 * При успіху isLoggedIn стає true → StackNavigator автоматично
 * показує Main без navigation.navigate.
 * При невдачі показує повідомлення про помилку під формою.
 */
const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    // Базова клієнтська валідація перед викликом login()
    if (email.trim().length === 0) {
      setError('Please enter your email.');
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    const success = login(email.trim(), password);

    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
    // При success нічого не робимо — StackNavigator сам перемкнеться на Main
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Grimoire</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <View style={styles.form}>
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Помилка валідації або авторизації */}
        {error.length > 0 && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <CustomButton
          title="Log In"
          onPress={handleLogin}
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
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 8,
    marginBottom: 40,
  },
  form: {
    gap: 16,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.error,
    textAlign: 'center',
  },
});

export default LoginScreen;