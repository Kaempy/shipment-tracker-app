import React from 'react';
import { Image, Text, View } from 'react-native';

const Emptylist = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <View className="items-center justify-center px-4">
      <Image
        source={require('../../assets/images/empty.png')}
        alt="Empty List"
        resizeMode="contain"
        className="h-[215px] w-[270px]"
      />
      <Text className="font-psemibold text-2xl text-white">{title}</Text>
      <Text className="font-pmedium mt-2 text-sm text-gray-100">
        {subTitle}
      </Text>
    </View>
  );
};

export default Emptylist;
