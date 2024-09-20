import { Button } from '@components/ui/button';
import { Text } from '@components/ui/text';
import { useAuth } from '@context/AuthContext';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) router.replace('/(tabs)');
  }, [user]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        className="h-full p-6"
        contentContainerStyle={styles.container}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          alt="logo"
          resizeMode="contain"
          className="h-9 w-[12.9375rem] flex-1"
        />
        <Button
          className="w-full bg-white"
          onPress={() => router.push('/(tabs)')}
        >
          <Text className="w-full text-center text-primary">Login</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  rootContainer: {
    backgroundColor: '#2F50C1',
    height: '100%',
  },
});
