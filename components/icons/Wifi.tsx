import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function Wifi(props: SvgProps) {
  return (
    <Svg width={73} height={73} fill="none" {...props}>
      <Path
        d="M36.5 60.833a3.042 3.042 0 100-6.083 3.042 3.042 0 000 6.083zM36.5 42.583c-3.937 0-7.72 1.527-10.555 4.259a3.043 3.043 0 104.228 4.38 9.368 9.368 0 0112.654 0 3.044 3.044 0 004.227-4.38A15.208 15.208 0 0036.5 42.583zM36.5 27.375a27.376 27.376 0 00-19.68 8.365 3.078 3.078 0 002.322 5.19 3.077 3.077 0 002.15-.962 21.292 21.292 0 0130.66 0 3.041 3.041 0 002.16.912 3.04 3.04 0 002.19-5.14A27.375 27.375 0 0036.5 27.375z"
        fill="#818181"
      />
      <Path
        d="M66.065 24.12a42.584 42.584 0 00-59.13 0 3.042 3.042 0 004.198 4.38 36.5 36.5 0 0150.735 0 3.041 3.041 0 002.098.852 3.043 3.043 0 003.03-3.106 3.042 3.042 0 00-.93-2.126z"
        fill="#818181"
      />
    </Svg>
  );
}

export default Wifi;