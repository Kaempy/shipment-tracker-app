import React, { Component } from 'react';
import { Path, Svg } from 'react-native-svg';

export class ArrowRight extends Component {
  render() {
    return (
      <Svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <Path
          d="M4.88889 1.58337L7.66667 4.50004M7.66667 4.50004L4.88889 7.41671M7.66667 4.50004L1 4.50004"
          stroke="#2F50C1"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
}

export default ArrowRight;
