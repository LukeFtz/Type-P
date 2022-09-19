import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function Icon(props: SvgProps) {
  return (
    <Svg width={191} height={214} fill="none" {...props}>
      <Path
        d="M99 192.5h-3l-3.5-17 70.5-47-67.5-76-67.5 76L96 203l83-49.5 1 1L96 214l-79.5-85.5L95.5 0l80 128.5-74 48.5-2.5 15.5z"
        fill="#42C3A1"
      />
      <Path
        d="M103 166l-11 6.5-5.5-24-86-54h190l-85 54L103 166z"
        fill="#C51818"
      />
      <Path d="M132.5 94.5l21 24 11-7.5-10-16.5h-22z" fill="#42C3A1" />
    </Svg>
  );
}

export default Icon;
