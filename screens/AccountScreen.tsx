import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../context/AuthContext';
import UserAvatar from '../components/UserAvatar';
import CustomButton from '../components/CustomButton';

const COLORS = {
  text: '#1A1A1A',
  textSecondary: '#666666',
  primary: '#6750A4',
  background: '#FFFFFF',
  backgroundGuest: '#F7F2FA',
};

/**
 * AccountScreen — екран профілю користувача.
 *
 * Використовує useContext (через useAuth) для доступу до AuthContext.
 * Візуально реагує на стан контексту:
 *   - email — введений юзером при логіні, береться з AuthContext
 *   - username — генерується з email (частина до @), береться з AuthContext
 *   - фон екрана: білий якщо user є, світло-фіолетовий якщо немає
 *
 * logout() скидає isLoggedIn → StackNavigator автоматично
 * перемикається на Login без navigation.reset.
 */
const AccountScreen = () => {
  const insets = useSafeAreaInsets();

  // useContext (через хук useAuth) — отримуємо user і logout з AuthContext
  const { user, logout } = useAuth();

  const backgroundColor = user ? COLORS.background : COLORS.backgroundGuest;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 32, backgroundColor }]}>
      <UserAvatar onEditPress={() => console.log('edit pressed')} />

      {/* username і email — дані з AuthContext, залежать від введеного email */}
      <Text style={styles.username}>{user?.username ?? '@guest'}</Text>
      <Text style={styles.email}>{user?.email ?? ''}</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Log Out"
          onPress={logout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 12,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  buttonContainer: {
    width: '100%',
    padding: 24,
    marginTop: 16,
  },
});

export default AccountScreen;