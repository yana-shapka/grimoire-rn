import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomInput from '../components/TextInput';
import CustomButton from '../components/CustomButton';

const COLORS = {
  text: '#1A1A1A',
  textSecondary: '#666666',
  primary: '#6750A4',
  background: '#F7F2FA',
};

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <CustomButton
          title="Log In"
          onPress={() => console.log('login pressed')}
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
});

export default LoginScreen;