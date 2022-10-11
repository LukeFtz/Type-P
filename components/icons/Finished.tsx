import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

function Finished(props: SvgProps) {
  return (
    // <Svg width={92} height={92} fill="none" {...props}>
    <Svg viewBox="0 0 92 92" fill="none" {...props}>
      <Circle cx={46} cy={46} r={45.5} fill="#fff" stroke="#0C6951" />
      <Path
        d="M38.998 65.415a3.245 3.245 0 01-2.369-1.039L20.857 47.598a3.249 3.249 0 114.738-4.446L38.965 57.4l27.293-29.857a3.244 3.244 0 114.803 4.35L41.4 64.343a3.246 3.246 0 01-2.37 1.07h-.032z"
        fill="#0C6951"
      />
    </Svg>
  );
}

export default Finished;
