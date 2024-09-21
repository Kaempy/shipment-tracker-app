import { useAuth } from '@context/AuthContext';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/(tabs)/');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-4 py-8">
          <View className="flex-row items-center justify-between">
            <Image
              source={require('../../../assets/images/avatar.png')}
              resizeMode="contain"
              className="h-10 w-10"
              alt="User avatar"
            />
            <Image
              source={require('../../../assets/images/logo-blue.png')}
              resizeMode="contain"
              className="h-4 w-auto"
              alt="Blue logo"
            />
            <Pressable
              onPress={handleLogout}
              className="h-11 w-11 items-center justify-center rounded-full bg-gray-100 p-2"
            >
              <Image
                source={require('../../../assets/images/logout.png')}
                resizeMode="contain"
                className="h-5"
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
