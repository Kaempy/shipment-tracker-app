/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  no-unused-vars */

import { Button } from '@components/ui/button';
import { Text } from '@components/ui/text';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Message } from '@src/types/base';
import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ActivityIndicator, View } from 'react-native';

type Props = {
  data: Message[];
  addFilter: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
};

const FilterSheet = forwardRef<BottomSheetModal, Props>(
  ({ data, addFilter, loading }, ref) => {
    const snapPoints = useMemo(() => ['33%'], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    const handleFilterClose = () => {
      (ref as React.RefObject<BottomSheetModal>).current?.close();
    };

    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const getSelectedFilter = (key: string) => {
      return selectedFilter === key;
    };
    const onFilter = useCallback(() => {
      addFilter(selectedFilter);
      handleFilterClose();
    }, [selectedFilter]);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <View className="flex-row items-center justify-between">
            <Button variant="link" onPress={handleFilterClose}>
              <Text className="text-base font-medium">Cancel</Text>
            </Button>
            <Text className="text-lg font-semibold">Filters</Text>
            <Button variant="link" onPress={onFilter}>
              <Text className="text-base font-medium">Done</Text>
            </Button>
          </View>
          <View className="h-1 border-b border-[#EAE7F2]" />
          <View className="m-6">
            <Text className="text-sm font-medium uppercase text-[#58536E]">
              Shipment Status
            </Text>
            {loading ? (
              <View className="flex-1 py-4">
                <ActivityIndicator color="#2F50C1" />
              </View>
            ) : (
              <View className="mt-4 flex-row flex-wrap gap-4">
                {data?.map((item) => (
                  <Button
                    variant="secondary"
                    key={item.name}
                    className={`border-[1.5px] ${
                      getSelectedFilter(item.name)
                        ? 'border-[#6E91EC]'
                        : 'border-transparent'
                    } bg-[#F4F2F8]`}
                    onPress={() => setSelectedFilter(item.name)}
                  >
                    <Text
                      className={`text-[#58536E] ${getSelectedFilter(item.name) ? 'text-[#2F50C1]' : ''}`}
                    >
                      {item.status}
                    </Text>
                  </Button>
                ))}
              </View>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default FilterSheet;
