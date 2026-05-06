import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import UserAvatar from '../components/UserAvatar';
import CustomButton from '../components/CustomButton';

const COLORS = {
  text: '#1A1A1A',
  textSecondary: '#666666',
};

const AccountScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleLogOut = () => {
    // @ts-ignore
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 32 }]}>
      <UserAvatar onEditPress={() => console.log('edit pressed')} />
      <Text style={styles.name}>Yana Shapka</Text>
      <Text style={styles.username}>@yanashapka</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Log Out"
          onPress={handleLogOut}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 12,
  },
  username: {
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