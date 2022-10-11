import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function Edit(props: SvgProps) {
  return (
    <Svg width={29} height={29} fill="none" {...props}>
      <Path
        d="M23.442 8.87L20.13 5.557a2.417 2.417 0 00-3.214-.084L6.042 16.349c-.39.394-.634.91-.689 1.462l-.52 5.039a1.209 1.209 0 001.209 1.317h.109l5.038-.46a2.417 2.417 0 001.462-.688l10.875-10.875a2.32 2.32 0 00-.084-3.275zm-4.109 4.035l-3.238-3.238 2.356-2.417 3.3 3.299-2.418 2.356z"
        fill="#FC6A00"
      />
    </Svg>
  );
}

export default Edit;
