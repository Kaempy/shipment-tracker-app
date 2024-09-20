import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-4">
          <Text className="text-3xl">Profile</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
