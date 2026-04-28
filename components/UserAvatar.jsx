import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const COLORS = {
  background: '#F5EFF7',
  placeholderPurple: '#D0BCFF',
  iconBackground: '#6750A4',
  iconColor: '#FFFFFF',
};

const UserAvatar = ({ imageUrl, onEditPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <View style={styles.placeholderHead} />
            <View style={styles.placeholderBody} />
          </View>
        )}
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEditPress}
          activeOpacity={0.8}
        >
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  placeholderHead: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.placeholderPurple,
    position: 'absolute',
    top: 18,
  },
  placeholderBody: {
    width: 70,
    height: 45,
    borderRadius: 35,
    backgroundColor: COLORS.placeholderPurple,
    marginBottom: -10,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    color: COLORS.iconColor,
    fontSize: 14,
  },
});

export default UserAvatar;