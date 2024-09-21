import { Checkbox } from '@components/ui/checkbox';
import { useAuth } from '@context/AuthContext';
import Bell from '@svgs/bell';
import { ListFilter, ScanLine } from 'lucide-react-native';
import React, { Fragment, memo, useState } from 'react';
import { Image, View } from 'react-native';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import SearchInput from './SearchInput';

type Props = {
  showFilterModal: () => void;
};

const ListHeader = ({ showFilterModal }: Props) => {
  const { user } = useAuth();
  const [checked, setChecked] = useState(false);

  return (
    <Fragment>
      <View className="mb-8 gap-4">
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
          <Bell />
        </View>
        <View>
          <Text className="text-black/60">Hello,</Text>
          <Text className="text-3xl font-semibold text-black">
            {user?.full_name || 'N/A'}
          </Text>
        </View>
        <SearchInput placeholder="Search" />
        <View className="flex-row items-center justify-center gap-4">
          <Button
            className="flex w-[48%] flex-row items-center justify-center gap-2 bg-[#F4F2F8]"
            onPress={showFilterModal}
          >
            <ListFilter color="#58536E" />
            <Text className="text-[#58536E]">Filters</Text>
          </Button>
          <Button className="flex w-[48%] flex-row items-center justify-center gap-2">
            <ScanLine color="#ffffff" />
            <Text className="text-white">Add Scan</Text>
          </Button>
        </View>
      </View>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-semibold">Shipments</Text>
        <View className="flex-row items-center justify-center gap-2">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <Text className="text-lg text-primary">Mark All</Text>
        </View>
      </View>
    </Fragment>
  );
};

export default memo(ListHeader);
