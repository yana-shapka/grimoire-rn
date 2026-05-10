import React, { useRef, useState } from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  useWindowDimensions,
  PanResponder,
} from 'react-native';

import SearchScreen from '../screens/SearchScreen';
import FilterScreen from '../screens/FilterScreen';

export let openFilterDrawer: () => void = () => {};

const SWIPE_THRESHOLD = 50;

const SearchDrawerNavigator = () => {
  const { width } = useWindowDimensions();
  const drawerWidth = width * 0.85;
  const translateX = useRef(new Animated.Value(drawerWidth)).current;
  const isOpen = useRef(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [filterVersion, setFilterVersion] = useState(0);

  const openDrawer = () => {
    isOpen.current = true;
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: drawerWidth,
        useNativeDriver: true,
        bounciness: 0,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      isOpen.current = false;
    });
  };

  const handleApply = () => {
    setFilterVersion(v => v + 1);
  };

  openFilterDrawer = openDrawer;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const { dx, moveX } = gestureState;
        if (!isOpen.current && moveX > width - 30 && dx < 0) {
          const newX = Math.max(0, drawerWidth + dx);
          translateX.setValue(newX);
        } else if (isOpen.current && dx > 0) {
          const newX = Math.min(drawerWidth, dx);
          translateX.setValue(newX);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        if (!isOpen.current && dx < -SWIPE_THRESHOLD) {
          openDrawer();
        } else if (isOpen.current && dx > SWIPE_THRESHOLD) {
          closeDrawer();
        } else if (isOpen.current) {
          openDrawer();
        } else {
          closeDrawer();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <SearchScreen filterVersion={filterVersion} />

      <Animated.View
        style={[styles.overlay, { opacity: overlayOpacity }]}
        pointerEvents={isOpen.current ? 'auto' : 'none'}
      >
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          { width: drawerWidth, transform: [{ translateX }] },
        ]}
      >
        <FilterScreen onClose={closeDrawer} onApply={handleApply} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default SearchDrawerNavigator;