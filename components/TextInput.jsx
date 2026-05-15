import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const COLORS = {
  border: '#E0E0E0',
  placeholder: '#8F9098',
  text: '#1F2024',
  icon: '#8F9098',
};

const EyeIcon = ({ visible }) => (
  <View style={[styles.eyeIcon, !visible && styles.eyeIconHidden]} />
);


const CustomInput = ({ placeholder, secureTextEntry = false, ...rest }) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        secureTextEntry={isSecure}
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsSecure(!isSecure)}
        >
          <EyeIcon visible={!isSecure} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.icon,
  },
  eyeIconHidden: {
    opacity: 0.3,
  },
});

export default CustomInput;