import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Wallet = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-4">
          <Text className="text-3xl">Wallet</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallet;
