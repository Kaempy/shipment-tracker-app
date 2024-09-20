import React from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg, SvgProps } from 'react-native-svg';

const Containers = ({ fill }: SvgProps) => {
  return (
    <Svg width="26" height="25" viewBox="0 0 26 25" fill="none">
      <G clipPath="url(#clip0_1_2578)">
        <Path
          d="M16.1474 13.6678V4.35383L11.8079 3.77603L11.6593 8.09936L10.0704 7.017L8.48143 7.91422L8.80899 3.39355L6.37572 3.08227V12.559L16.1474 13.6678Z"
          fill={fill}
        />
        <Path
          d="M20.3161 24.2696V14.9556L15.9766 14.3778L15.828 18.7012L14.2391 17.6188L12.6501 18.516L12.9777 13.9954L10.7275 13.7756V23.2524L20.3161 24.2696Z"
          fill={fill}
        />
        <Path
          d="M6.81111 13.3036L6.66666 17.5212L5.07771 16.4388L3.48876 17.336L3.81631 12.8153L1.56615 12.5061V21.9828L9.85472 22.9248V13.6414L6.81111 13.3036Z"
          fill={fill}
        />
        <Path
          d="M20.8105 11.9873L17.6123 13.8957L20.7882 14.3005L23.8297 12.384L20.8105 11.9873Z"
          fill={fill}
        />
        <Path
          d="M21.191 15.0431V24.0478L24.6191 22.0032L24.552 12.9252L21.191 15.0431Z"
          fill={fill}
        />
        <Path
          d="M5.68806 11.32V10.437L2.29451 11.9283L4.24153 12.1765L5.68806 11.32Z"
          fill={fill}
        />
        <Path
          d="M17.0223 4.44132V13.446L20.0761 11.6231L20.4484 11.3078L20.3833 2.3234L17.0223 4.44132Z"
          fill={fill}
        />
        <Path
          d="M15.6164 1.25121L12.2799 3.14534L16.6195 3.69872L19.661 1.78222L15.6164 1.25121Z"
          fill={fill}
        />
        <Path
          d="M9.23624 2.75471L12.4711 0.836174L11.405 0.695793L7.28921 2.50447L9.23624 2.75471Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_2578">
          <Rect
            width="24.6134"
            height="25"
            fill="white"
            transform="translate(0.693359)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Containers;
