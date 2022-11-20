import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import Svg, { Circle } from "react-native-svg";
import { finishRecycle } from "../../utilities/controler";
import { updateTime } from "../../src/reducers/utilities";

// import { Container } from './styles';

const AnimateProgress = Animated.createAnimatedComponent(Circle);

interface RecyclingProps {
  timeDefined: number;
}

const RecycleProcess: React.FC<RecyclingProps> = ({ timeDefined }) => {
  const progressValue = useSharedValue<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const runningTimmer: { current: NodeJS.Timeout | null } = useRef(null); //let
  const borderWidth = 10;
  let currentTime = 0;
  const sizeCircle = 150;
  const diametroPercent = (sizeCircle - borderWidth) * 2 * Math.PI;
  const progress = useSharedValue(diametroPercent * (100 / 100));
  let startTime: number;
  const dispatch = useDispatch();
  // const [timeUpdated, setTimeUpdated] = useState<number>(0);

  const animatedProgress = useAnimatedProps(() => ({
    strokeDashoffset: progress.value,
  }));

  useEffect(() => {
    if (percent >= 100) {
      clearInterval(runningTimmer.current as NodeJS.Timeout);
      finishRecycle();
      //   finishRecicleProcess();
    }
  }, [percent]);

  //   const finishRecicleProcess = () => {
  //     progressValue.value = withTiming(0, { duration: 500, easing: Easing.ease });
  //   };
  const startRecicleProcess = () => {
    progressValue.value = withTiming(1, {
      duration: 1000,
      easing: Easing.ease,
    });
  };

  const timmer = () => {
    // currentTime = currentTime + 1;
    currentTime = Math.floor((Date.now() - startTime) / 1000);
    dispatch(updateTime(currentTime));
    definePercent();
  };

  const definePercent = () => {
    // console.log(percent);
    const auxPercent = (100 * currentTime) / timeDefined; //let
    // console.log("currentTime: " + currentTime);
    // console.log("timeDefined: " + timeDefined);
    const auxPercente =
      auxPercent - Math.floor(auxPercent) !== 0
        ? auxPercent.toFixed(1)
        : auxPercent;
    setPercent(Number.parseFloat(auxPercente + ""));
    // console.log(auxPercent);
    // console.log(typeof auxPercent);
    // let auxPercentToProgress = 100 - auxPercent
    const auxProgress = diametroPercent * ((100 - auxPercent) / 100); //let
    progress.value = withTiming(auxProgress, {
      duration: 500,
      easing: Easing.ease,
    });
    // percentage.value = auxPercent
    // setProgress(auxProgress)
  };

  const startRecicle = () => {
    currentTime = 0;
    startTime = Date.now();
    runningTimmer.current = setInterval(timmer, 1000);
  };

  const animateReciclingView = useAnimatedStyle(() => {
    const opacity = interpolate(progressValue.value, [0, 1], [0, 1]);
    return {
      opacity,
    };
  });

  useEffect(() => {
    // if (timeDefined !== 0) {
    // setTimeUpdated(timeDefined);
    startRecicleProcess();
    startRecicle();
    // }
    // return clearInterval(runningTimmer.current as NodeJS.Timeout);
  }, []);

  return (
    <Animated.View style={animateReciclingView}>
      <View style={styles.recicling}>
        <View style={styles.viewTxtPercent}>
          <Text style={styles.txtPercent}>{percent}%</Text>
        </View>
        <Svg height="300" width="300">
          <AnimateProgress
            cx={sizeCircle}
            cy={sizeCircle}
            r={sizeCircle - borderWidth}
            fill="none"
            stroke="#15A07C"
            strokeWidth={borderWidth}
            strokeDasharray={`${diametroPercent} ${diametroPercent}`}
            animatedProps={animatedProgress}
          />
        </Svg>
      </View>
    </Animated.View>
  );
};

const ReclyclingOptimized = React.memo(RecycleProcess);

export default ReclyclingOptimized;

const styles = StyleSheet.create({
  recicling: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  viewTxtPercent: {
    position: "absolute",
  },
  txtPercent: {
    fontFamily: "ZenBold",
    fontSize: 80,
    color: "#07573B",
  },
});
