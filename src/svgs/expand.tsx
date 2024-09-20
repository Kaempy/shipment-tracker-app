import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

const Expand = () => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Rect y="0.5" width="24" height="24" rx="12" fill="white" />
      <Path
        d="M13.4711 7.16663H17.3334M17.3334 7.16663V11.0287M17.3334 7.16663L12.8274 11.6724M10.5291 17.8333H6.66675M6.66675 17.8333V13.9712M6.66675 17.8333L11.1728 13.3275"
        stroke="#4561DB"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Expand;
