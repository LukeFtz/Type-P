import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function Verified(props: SvgProps) {
  return (
    <Svg width={48} height={48} fill="none" {...props}>
      <Path
        d="M24 4a20 20 0 100 40 20 20 0 000-40zm8.6 15.22l-9.14 12a2 2 0 01-1.58.78 2.002 2.002 0 01-1.58-.76l-4.88-6.22a2.003 2.003 0 013.16-2.46l3.26 4.16 7.56-10a2.012 2.012 0 013.2 2.44v.06z"
        fill="#279C7D"
      />
    </Svg>
  );
}

export default Verified;
