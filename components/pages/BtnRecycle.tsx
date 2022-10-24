import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { startRecycle } from "../../utilities/controler";
import { InScreen } from "../../utilities/types";

const { width } = Dimensions.get("screen");

const BtnRecycle: React.FC<InScreen> = ({ apperInScreen }) => {
  const opacity = useSharedValue<number>(0);

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
    } else {
      opacity.value = 1;
    }
  }, [apperInScreen]);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity onPress={() => startRecycle()}>
        <View style={styles.btnView}>
          <Text style={styles.txtBtn}>Iniciar</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(BtnRecycle);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btnView: {
    backgroundColor: "#17AE86",
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
