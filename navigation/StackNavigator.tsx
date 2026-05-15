import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../context/AuthContext';
import TabNavigator from './TabNavigator';
import CardDetailsScreen from '../screens/CardDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export const SCREENS = {
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  MAIN: 'Main',
  CARD_DETAILS: 'CardDetails',
};

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Main: undefined;
  CardDetails: { card: any };
};

const Stack = createStackNavigator();

/**
 * StackNavigator — кореневий навігатор додатку.
 *
 * Читає isLoggedIn з AuthContext щоб визначити початковий екран:
 *   - isLoggedIn: true  → показує Main (таби)
 *   - isLoggedIn: false → показує Onboarding → Login
 *
 * Це замінює попередній підхід де logout робив navigation.reset вручну.
 * Тепер logout() в AuthContext скидає isLoggedIn → навігатор
 * автоматично перемикається на Login без явного navigation.reset.
 */
const StackNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // Залогінений юзер бачить основний додаток
        <>
          <Stack.Screen name={SCREENS.MAIN} component={TabNavigator} />
          <Stack.Screen
            name={SCREENS.CARD_DETAILS}
            component={CardDetailsScreen}
            options={({ route, navigation }) => ({
              headerShown: true,
              headerTitle: route.params?.card?.name || 'Card Details',
              headerTitleStyle: styles.headerTitle,
              headerStyle: styles.header,
              headerTintColor: '#6B4EFF',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                  <Text style={styles.backText}>{'<'}</Text>
                </TouchableOpacity>
              ),
            })}
          />
        </>
      ) : (
        // Незалогінений юзер проходить онбординг → логін
        <>
          <Stack.Screen name={SCREENS.ONBOARDING} component={OnboardingScreen} />
          <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EEF8',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  backButton: {
    paddingHorizontal: 16,
  },
  backText: {
    fontSize: 24,
    color: '#6B4EFF',
    fontWeight: '600',
  },
});

export default StackNavigator;