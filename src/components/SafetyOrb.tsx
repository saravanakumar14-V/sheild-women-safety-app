import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { colors } from "../theme/colors";

type Props = {
  state: "SAFE" | "CHECKING" | "THREAT" | "EMERGENCY";
};

export function SafetyOrb({ state }: Props) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.08, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getColor = () => {
    switch (state) {
      case "SAFE":
        return colors.safe;
      case "CHECKING":
        return colors.caution;
      case "THREAT":
        return colors.risk;
      case "EMERGENCY":
        return colors.emergency;
    }
  };

  return (
    <Animated.View
      style={[
        styles.orb,
        animatedStyle,
        { backgroundColor: getColor() },
      ]}
    >
      <Text style={styles.text}>{state}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  orb: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});