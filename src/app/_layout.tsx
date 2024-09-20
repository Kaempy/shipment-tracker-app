/* eslint-disable camelcase */

import AnimatedSplashScreen from '@components/AnimatedSplashScreen';
import { AuthProvider } from '@context/AuthContext';
import { NAV_THEME } from '@lib/constants';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../global.css';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded, error] = useFonts({
    sf: require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
    sf_500: require('../../assets/fonts/SF-Pro-Display-Medium.otf'),
    sf_600: require('../../assets/fonts/SF-Pro-Display-Semibold.otf'),
    sf_700: require('../../assets/fonts/SF-Pro-Display-Bold.otf'),
  });

  useEffect(() => {
    if (error) throw error;

    SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!appReady) {
    return (
      <AnimatedSplashScreen
        fontsLoaded={fontsLoaded}
        setAppReady={setAppReady}
      />
    );
  }

  return (
    <ThemeProvider value={LIGHT_THEME}>
      <StatusBar style="light" />
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
      <PortalHost />
    </ThemeProvider>
  );
}
