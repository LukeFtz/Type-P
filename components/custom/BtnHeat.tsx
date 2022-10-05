import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { startHeatting } from "../../utilities/controler";
import { InScreen } from "../../utilities/types";

const { width } = Dimensions.get("screen");

const BtnHeat: React.FC<InScreen> = ({ apperInScreen }) => {
  const opacity = useSharedValue<number>(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  useEffect(() => {
    if (!apperInScreen) {
      opacity.value = 0;
    }
  }, [apperInScreen]);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity onPress={() => startHeatting()}>
        <View style={styles.btnView}>
          <Text style={styles.txtBtn}>Aquecer</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(BtnHeat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btnView: {
    backgroundColor: "#FF8A00",
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtn: {
    color: "#fff",
    fontSize: 50,
    fontFamily: "ZenLight",
  },
});
