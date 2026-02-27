// GDD - Renkli ilerleme çubuğu
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme/colors';
import { SIZES } from '../../theme/fonts';

export default function ProgressBar({
  progress = 0,       // 0.0 - 1.0 arası
  height = 8,
  colors = ['#FF4757', '#FF9F43', '#FFC312', '#2ED573'],
  backgroundColor = 'rgba(0,0,0,0.1)',
  borderRadius,
  style,
  animated = true,
}) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(widthAnim, {
        toValue: progress,
        duration: 600,
        useNativeDriver: false,
      }).start();
    } else {
      widthAnim.setValue(progress);
    }
  }, [progress]);

  const radius = borderRadius ?? height / 2;

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor, borderRadius: radius },
        style,
      ]}
    >
      <Animated.View
        style={{
          height: '100%',
          borderRadius: radius,
          overflow: 'hidden',
          width: widthAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
});
