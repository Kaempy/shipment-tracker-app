import LottieView from 'lottie-react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type Props = {
  setAppReady: Dispatch<SetStateAction<boolean>>;
  fontsLoaded: boolean;
};
const AnimatedSplashScreen = ({ setAppReady, fontsLoaded }: Props) => {
  return (
    <Animated.View entering={FadeIn} style={styles.rootContainer}>
      <LottieView
        source={require('../../assets/lottie.json')}
        autoPlay
        style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
        resizeMode="contain"
        loop={false}
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) {
            if (fontsLoaded) {
              setAppReady(true);
            }
          }
        }}
      />
    </Animated.View>
  );
};

export default AnimatedSplashScreen;
const styles = StyleSheet.create({
  rootContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});
