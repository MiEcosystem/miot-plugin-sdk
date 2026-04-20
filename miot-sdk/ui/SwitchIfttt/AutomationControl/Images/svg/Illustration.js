import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Illustration = (props) => (
  <Svg width={50} height={50} fill="none" viewBox="0 0 50 50" {...props}>
    <Path fill={props.fill} d="M25 40c8.284 0 15-6.716 15-15s-6.716-15-15-15-15 6.716-15 15 6.716 15 15 15" />
    <Path
      fill={props.fillBack}
      fillRule="evenodd"
      d="M25 19.117a.98.98 0 0 1 .98.98v3.922H29.9a.98.98 0 0 1 0 1.96H25.98v3.922a.98.98 0 1 1-1.96 0V25.98h-3.921a.98.98 0 1 1 0-1.96h3.921v-3.922a.98.98 0 0 1 .98-.98"
      clipRule="evenodd"
      opacity={0.95}
    />
  </Svg>
);
export default Illustration;