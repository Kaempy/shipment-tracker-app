import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { cn } from '@lib/utils';
import { Message, ShipmentDetails } from '@src/types/base';
import ArrowRight from '@svgs/arrow-right';
import Expand from '@svgs/expand';
import Phone from '@svgs/phone';
import Whatsapp from '@svgs/whatsapp';
import { ArrowRight as Arrow } from 'lucide-react-native';
import { memo, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

type Props = {
  item: ShipmentDetails;
  data: Message[];
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const ShipmentItem = ({ item, data, checked, onCheckedChange }: Props) => {
  const [touched, setTouched] = useState(false);

  const {
    name,
    origin_city,
    destination_city,
    sender_address,
    destination_address_line_1,
    status,
  } = item;

  const toggleExpand = () => setTouched(!touched);

  const statusColor =
    data?.find((item) => item.status === status)?.color ?? '#3F395C';

  return (
    <View className="mb-4">
      <View
        className={cn(
          'flex-row items-center justify-between gap-3 rounded-b-xl rounded-t-xl bg-[#F4F2F8] p-4',
          touched && 'rounded-b-none',
          checked && touched && 'border border-b-0 border-primary',
          checked && !touched && 'border border-primary'
        )}
      >
        <View className="flex-row items-center justify-between gap-3">
          <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
          <Image
            source={require('../../../assets/images/box.png')}
            resizeMode="contain"
            alt="Shipment box"
            className="h-11 w-11"
          />
          <View>
            <Text className="text-[#3F395C]">AWB</Text>
            <Text className="text-base font-semibold">{name}</Text>
            <View className="flex-row items-center gap-1">
              <Text className="text-xs capitalize text-[#757281]">
                {origin_city}
              </Text>
              <ArrowRight />
              <Text className="text-xs capitalize text-[#757281]">
                {destination_city}
              </Text>
            </View>
          </View>
        </View>
        <Badge style={{ backgroundColor: `${statusColor}10` }}>
          <Text
            className={cn('text-xs uppercase')}
            style={{ color: statusColor }}
          >
            {status}
          </Text>
        </Badge>
        <Pressable
          onPress={toggleExpand}
          accessibilityRole="button"
          accessibilityLabel="Toggle shipment details"
        >
          {touched ? (
            <Image
              source={require('../../../assets/images/expanded.png')}
              alt="Expanded icon"
              className="h-7 w-7"
              resizeMode="contain"
            />
          ) : (
            <Expand />
          )}
        </Pressable>
      </View>
      {touched && (
        <Animated.View entering={FadeInUp}>
          <View className="border-[1px] border-t border-dashed border-primary/15" />
          <View
            className={cn(
              'rounded-b-xl rounded-t-none bg-[#F4F2F880] p-3',
              checked && 'border border-t-0 border-primary'
            )}
          >
            <View className="flex-row items-center justify-between">
              <View className="gap-0.5">
                <Text className="text-[11px] capitalize text-primary">
                  Origin
                </Text>
                <Text className="text-base capitalize text-black">
                  {origin_city}
                </Text>
                <Text className="text-[13px] font-light capitalize text-[#757281]">
                  {sender_address ?? 'N/A'}
                </Text>
              </View>
              <Arrow color="#2F50C1" />
              <View className="gap-0.5">
                <Text className="text-[11px] capitalize text-primary">
                  Destination
                </Text>
                <Text className="text-base capitalize text-black">
                  {destination_city}
                </Text>
                <Text className="text-[13px] font-light capitalize text-[#757281]">
                  {destination_address_line_1 ?? 'N/A'}
                </Text>
              </View>
            </View>
            <View className="mt-6 w-full flex-row justify-end gap-4">
              <Button className="flex flex-row items-center justify-center gap-1 bg-[#6E91EC]">
                <Text>
                  <Phone />
                </Text>
                <Text className="text-white">Call</Text>
              </Button>
              <Button className="flex flex-row items-center justify-center gap-1 bg-[#25D366]">
                <Text>
                  <Whatsapp />
                </Text>
                <Text className="text-white">Whatsapp</Text>
              </Button>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default memo(ShipmentItem);
